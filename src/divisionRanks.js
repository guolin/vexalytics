import _ from 'lodash';
import { parse } from 'json2csv';
import fs from 'fs';
import { getDivisions } from './utils/csvReader.js';
import { getCachedData } from './utils/index.js';

export default async function ({ robotevents, directionName }) {
    const divisions = await getDivisions(directionName);


    console.log(`${divisions.length} divisions founded.`);
    // 获取每个event的matches
    const allRankings = [];
    for(const division of divisions) {
        const rankings = await getCachedData(`event_rankings_${directionName}_${division.eventId}_${division.id}`, async () => {
          const event = await robotevents.events.get(parseInt(division.eventId));
          const watchableData = await event.rankings(parseInt(division.id));
          console.log(`get ${watchableData.array().length} division rankings for ${division.eventId}_${division.id}`);
          return watchableData.array();
        });
        rankings.forEach(ranking => allRankings.push(ranking));
    }
    console.log(`${allRankings.length} matches founded.`);

    const zipData = allRankings.map((r) => ({
      eventId: r.event.id,
      divisionId: r.division.id,
      teamName: r.team.name,
      ..._.omit(r, ['team', 'division', 'event'])
    }));

    const csv = parse(zipData);
    fs.writeFile(`public/${directionName}/ranks.csv`, csv, (err) => {
        if (err) throw err;
        console.log(`public/${directionName}/ranks.csv been written to file`);
    });

}