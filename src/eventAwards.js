import _ from 'lodash';
import { parse } from 'json2csv';
import { flatten } from 'flat';
import fs from 'fs';
import { getEvents } from './utils/csvReader.js';
import { getCachedData } from './utils/index.js';

export default async function ({ robotevents, directionName }) {
    const events = await getEvents(directionName);
    console.log(`${events.length} events founded.`);

    // 获取每个event的matches
    const allAwards = [];
    for(const e of events) {
        const awards = await getCachedData(`event_awards_${e.id}`, async () => {
            const event = await robotevents.events.get(parseInt(e.id));
            const watchableData = await event.awards();
            console.log(`get ${watchableData.array().length} awards for ${event.sku}`)
            return watchableData.array();
        });
        awards.forEach(a => allAwards.push(a));
    }

    // 扁平化
    const flattenedAwards = [];
    allAwards.forEach(awards => {
        awards.teamWinners.forEach(winner => {
            const flattenedData = {
                ..._.omit(awards, ['teamWinners', 'event']),
                teamName: winner.team.name,
                eventId: awards.event.id,
                divisionId: winner.division.id,
            };
            flattenedAwards.push(flattenedData);
          });

    })
    console.log(`${flattenedAwards.length} awards founded.`);

    const csv = parse(flattenedAwards.map((a) => flatten(a)));
    fs.writeFile(`public/${directionName}/awards.csv`, csv, (err) => {
        if (err) throw err;
        console.log(`public/${directionName}/awards.csv been written to file`);
    });

}