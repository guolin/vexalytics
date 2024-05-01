import _ from 'lodash';
import { parse } from 'json2csv';
import { flatten } from 'flat';
import fs from 'fs';

import cleaningLocation from './utils/location.js';

export default async function({ robotevents, region, seasonName, seasonDate, directionName }) {

    // 设置整个搜索的范围是 中国 VIQRC
    const season = robotevents.seasons.get(seasonName, seasonDate);
    const _events = await robotevents.events.search({
        season: [season],
    });
    const events = _.filter(_events, (x) => x.location.country === region );

    console.log('All events found: ', events.length);

    // 保存 events
    const eventsJson = events.map(
        (event)=>(
            flatten(_.omit(cleaningLocation(event.toJSON()), 'divisions')
        ))
    );
    const eventCsv = parse(eventsJson);
    fs.writeFile(`public/${directionName}/events.csv`, eventCsv, (err) => {
        if (err) throw err;
        console.log(`public/${directionName}/events.csv been written to file`);
    });

    // 保存 events
    const divisionsJson = [];
    events.forEach(e => {
        e.divisions.forEach(d => {
            divisionsJson.push({
                eventId: e.id,
                ...d
            });
        })
    })
    const divisionCsv = parse(divisionsJson);
    fs.writeFile(`public/${directionName}/divisions.csv`, divisionCsv, (err) => {
        if (err) throw err;
        console.log(`public/${directionName}/divisions.csv been written to file`);
    });
}