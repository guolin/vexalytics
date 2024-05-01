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
      const rankings = await getCachedData(`event_finalist_${directionName}_${division.eventId}_${division.id}`, async () => {
            const event = await robotevents.events.get(parseInt(division.eventId));
            const watchableData = await event.finalistRankings(parseInt(division.id));
            console.log(`get finalist for ${division.eventId}_${division.id}`)
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
    fs.writeFile(`public/${directionName}/finalistRankings.csv`, csv, (err) => {
        if (err) throw err;
        console.log(`public/${directionName}/finalistRankings.csv been written to file`);
    });

}