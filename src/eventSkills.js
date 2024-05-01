import { getEvents } from './utils/csvReader.js';
import _ from 'lodash';
import { parse } from 'json2csv';
import fs from 'fs';
import { getCachedData } from './utils/index.js';
import { flatten } from 'flat';


export default async function ({ robotevents, directionName }) {
    const events = await getEvents(directionName);

    console.log(`${events.length} events founded.`);
    // 获取每个event的matches
    const allSkills = [];
    for(const e of events) {
        const skills = await getCachedData(`event_skills_${directionName}_${e.id}`, async () => {
            const event = await robotevents.events.get(parseInt(e.id));
            const watchableData = await event.skills();
            console.log(`get ${watchableData.array().length} skills for ${event.sku}`)
            return watchableData.array();
        });
        
        skills.forEach(a => allSkills.push({
            ..._.omit(a, ['event', 'team', 'season']),
            eventId: a.event.id,
            teamName: a.team.name,
            seasonId: a.season.id
        }));
    }
    console.log(`${allSkills.length} awards founded.`);

    const csv = parse(allSkills.map((a) => flatten(a)));
    fs.writeFile(`public/${directionName}/skills.csv`, csv, (err) => {
        if (err) throw err;
        console.log(`public/${directionName}/skills.csv been written to file`);
    });

}