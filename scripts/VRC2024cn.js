import * as robotevents from 'robotevents';
import fs from 'fs';
import api from '../src/index.js';

// 设置token
robotevents.authentication.setBearer("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiOTUxYzJjODc2Mjg5YjEyZDNkZTAzYTc3NDk5MTVlMTc4MDE1ZDRjMmZiZWM2YWY3NTFkOTgwMWUzZGMwOWE1NDc3MzA1MWNmYzEyNDBmODQiLCJpYXQiOjE2NTYyOTEwMDUuNDQxOTk5OSwibmJmIjoxNjU2MjkxMDA1LjQ0MjAwMywiZXhwIjoyNjAzMDY1ODA1LjQyNjM1ODIsInN1YiI6Ijg5ODQ2Iiwic2NvcGVzIjpbXX0.rau6vgn2Ip0_-nua-g_FfVBOT8HK2K8jm8JQF0UHM07l6auybf8WYTh-VS31o6U0ONmaxm0RojdppwvuxLIB9rgRcshj6kz9VyOulU151BTh-cjAJ2r3Ew9TN0TVXKEVcWptzyLxaPs9N8HEJsMO10G2BxOOs34tr1zGvY7MMY2A8Kg4eHoGtnifMEZXlty9qnY42j2hS8OTafSFgB0UIkCg83aAR5f8hJMn7BJ-yzPkRe-bBrGhzE269H8MKVhC1umkXSbsQn8iItaa-SyvRryQfCqb-2ZiQqLWsZjQxoVq6fbBDdU5YeP6CaGkpYnA8kUXEpR4aSxLOJd_Z3f-5kzm_EjIFlacvWksHPdSWbd9bgj78ypP-_XXvS627K6rv476TT1M7kGG_TPkzgfVuyC2HTx0rG0FKZ39Uxn43yX0Wc2x7Dkq1RpRAcoxSf-yUvnDDlNf3NqFi7gg43VReQEGY3czGk7hGHPD73veB7CLCchwmCmvEciS0AIYDdh2MPjbP39XpFZUPn1FRc0z4V3qJz46TsScr7yMX47GKmd9Uz_xk93v4S6_Phrgmw3Dk1I5MC4lnKi0lBvPALEg_iDbxauRvYcIiN84JeAxu-LlysawOI0HudaJ-FzCaeA3CP6DmaTDvegtYNTZrXbPm02yqyE7l-OLHIrAzjWf07o");

const region = "China";
const seasonName = "VRC";
const seasonDate = "2023-2024";
const directionName = "VRC_2024_CN";


(async function () {
    const dir = `./public/${directionName}`
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    await api.getEvents({ robotevents, region, seasonName, seasonDate, directionName });
    // await api.getEventTeams({ robotevents, directionName});
    // await api.getEventSkills({ robotevents, directionName });
    await api.getEventAwards({ robotevents, directionName });
    await api.getDivisionMatches({ robotevents, directionName });
    await api.getDivisionRanks({ robotevents, directionName });
    // await api.getDivisionFinalistRankings({ robotevents, directionName });

})();