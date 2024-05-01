import _ from 'lodash';
import { parse } from 'json2csv';
import fs from 'fs';
import { flatten } from 'flat';
import { getEvents } from './utils/csvReader.js';
import { getCachedData } from './utils/index.js';
import cleaningLocation from './utils/location.js';

export default async function ({ robotevents, directionName}) {
    const events = await getEvents(directionName);
    console.log(`${events.length} events founded.`);

    // 获取每个event的matches
    const allTeams = [];
    let index = 1;
    for (const event of events) {
        const teams = await getCachedData(`event_teams_${directionName}_${event.id}`, async () => {
            const watchableData = await robotevents.teams.search({ event: event.id });
            console.log(`get ${watchableData.length} teams for event ${event.sku}`);
            return watchableData.map(x => ({ eventId: event.id, ...x.toJSON()}));
        });
        teams.forEach(team => allTeams.push(team));
        console.log(`${index}/${events.length}`);
        index += 1;
    }
    console.log(`${allTeams.length} teams founded.`);

    const teamJson = allTeams.map((event) => (
        flatten(cleaningLocation(event))
    ));

    const csv = parse(teamJson);
    fs.writeFile(`public/${directionName}/teams.csv`, csv, (err) => {
        if (err) throw err;
        console.log(`public/${directionName}/teams.csv been written to file`);
    });

}