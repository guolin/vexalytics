import { getDivisions } from './utils/csvReader.js';
import _ from 'lodash';
import { parse } from 'json2csv';
import fs from 'fs';
import { getCachedData } from './utils/index.js';


export default async function ({ robotevents, directionName}) {
    const divisions = await getDivisions(directionName);
    console.log(`${divisions.length} divisions founded.`);

    // 获取每个event的matches
    const allMatches = [];
    for(const division of divisions) {
        const matches = await getCachedData(`event_matchess_${directionName}_${division.eventId}_${division.id}`, async () => {
            const event = await robotevents.events.get(parseInt(division.eventId));
            const watchableData = await event.matches(parseInt(division.id));
            console.log(`get ${watchableData.array().length} matches of ${division.eventId}`)
            return watchableData.array();
        });
        matches.forEach(m => allMatches.push(m));
    }
    console.log(`${allMatches.length} matches founded.`);

    // 将所有的match扁平化
    const flattenedMatches = [];
    allMatches.forEach(match => {
        match.alliances.forEach(alliance => {
            alliance.teams.forEach(team => {
              let flattenedData = {
                matchId: match.id,
                eventId: match.event.id,
                divisionId: match.division.id,
                round: match.round,
                instance: match.instance,
                matchnum: match.matchnum,
                scheduled: match.scheduled,
                started: match.started,
                field: match.field,
                scored: match.scored,
                name: match.name,
                session: match.session,
                allianceColor: alliance.color,
                allianceScore: alliance.score,
                teamName: team.team.name,
                teamSitting: team.setting
              };
          
              flattenedMatches.push(flattenedData);
            });
          });

    })
    console.log(`${flattenedMatches.length} flattenedMatches founded.`);

    const matchesCsv = parse(flattenedMatches);
    fs.writeFile(`public/${directionName}/matches.csv`, matchesCsv, (err) => {
        if (err) throw err;
        console.log(`public/${directionName}/matches.csv been written to file`);
    });

}