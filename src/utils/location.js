import _ from 'lodash';

function cleaningLocation(inputObject) {
  // 规则列表
  const ruleList = [
  { 
    test: ["北京", "北京市", "beijing", "beiujing"], 
    targetCity: "Beijing", 
    targetRegion: "Beijing" 
  },
  { 
    test: ["成都", "成都市"],
    targetCity: "Chengdu", 
    targetRegion: "Sichuan" 
  },
  {
    test: ["重庆", "重庆市", "chongqiang"],
    targetCity: "Chongqing",
    targetRegion: "Chongqing"
  },
  { 
    test: ["大庆"],
    targetCity: "Daqing", 
    targetRegion: "Heilongjiang" 
  },
  { 
    test: ["东莞", "东莞市"], 
    targetCity: "Dongguan", 
    targetRegion: "Guangdong" 
  },
  { 
    test: ["佛山", "佛山市"], 
    targetCity: "Foshan", 
    targetRegion: "Guangdong" 
  },
  { 
    test: ["福州市"], 
    targetCity: "Fuzhou", 
    targetRegion: "Fujian" 
  },
  {
    test: ["赣州"],
    targetCity: "Ganzhou", 
    targetRegion: "Jiangxi"
  },
  { 
    test: ["广东汕头"], 
    targetCity: "Shantou", 
    targetRegion: "Guangdong" 
  },
  { 
    test: ["广州", "广州市"], 
    targetCity: "Guangzhou", 
    targetRegion: "Guangdong" 
  },
  { 
    test: ["贵阳", "贵阳市"], 
    targetCity: "Guiyang", 
    targetRegion: "Guizhou" 
  },
  { 
    test: ["邯郸"], 
    targetCity: "Handan", 
    targetRegion: "Hebei" 
  },
  { 
    test: ["杭州", "杭州市"], 
    targetCity: "Hangzhou", 
    targetRegion: "Zhejiang" 
  },
  { 
    test: ["淮安"],
    targetCity: "Huaian",
    targetRegion: "Jiangsu" 
  },
  { 
    test: ["湖北武汉"], 
    targetCity: "Wuhan", 
    targetRegion: "Hubei"
  },
   
  { 
    test: ["河源市"], 
    targetCity: "Heyuan", 
    targetRegion: "Guangdong" 
  },
  { 
    test: ["湖北武汉"], 
    targetCity: "Wuhan", 
    targetRegion: "Hubei" 
  },
  { 
    test: ["淮安", "江苏省淮安市"], 
    targetCity: "Huaian", 
    targetRegion: "Jiangsu" 
  },
  { 
    test: ["吉安市"], 
    targetCity: "Jian", 
    targetRegion: "Jiangxi" 
  },
  { 
    test: ["江苏昆山"], 
    targetCity: "Kunshan", 
    targetRegion: "Jiangsu" 
  },
  { 
    test: ["江苏南京", "南京", "南京市"], 
    targetCity: "Nanjing", 
    targetRegion: "Jiangsu" 
  },
  { 
    test: ["凯里市"], 
    targetCity: "Kaili", 
    targetRegion: "Guizhou" 
  },
  { 
    test: ["兰州"], 
    targetCity: "Lanzhou", 
    targetRegion: "Gansu" 
  },
  { 
    test: ["洛阳"], 
    targetCity: "Luoyang", 
    targetRegion: "Henan" 
  },
  { 
    test: ["南昌市"],
    targetCity: "Nanchang",
    targetRegion: "Jiangxi" 
  },
  { 
        test: ["南京", "南京市"], 
        targetCity: "Nanjing", 
        targetRegion: "Jiangsu" 
    },
    { 
        test: ["保定"],
        targetCity: "Baoding",
        targetRegion: "Hebei"
    },
    { 
        test: ["南通市"],
        targetCity: "Nantong",
        targetRegion: "Jiangsu"  
    },
    { 
        test: ["宁波市"],
        targetCity: "Ningbo",
        targetRegion: "Zhejiang"
    },
    { 
        test: ["濮阳市"],
        targetCity: "Puyang",
        targetRegion: "Henan" 
    },
    { 
        test: ["秦皇岛", "秦皇岛市"], 
        targetCity: "Qinhuangdao", 
        targetRegion: "Hebei" 
    },
    { 
        test: ["青岛", "青岛市"], 
        targetCity: "Qingdao", 
        targetRegion: "Shandong" 
    },
    { 
        test: ["清远市"], 
        targetCity: "Qingyuan", 
        targetRegion: "Guangdong" 
    },
    { 
        test: ["厦门"], 
        targetCity: "Xiamen", 
        targetRegion: "Fujian" 
    },
    { 
        test: ["上海", "上海市", "shanghai"], 
        targetCity: "Shanghai", 
        targetRegion: "Shanghai" 
    },
    { 
        test: ["绍兴市"], 
        targetCity: "Shaoxing", 
        targetRegion: "Zhejiang" 
    },
    { 
        test: ["深圳", "深圳市"],
        targetCity: "Shenzhen",
        targetRegion: "Guangdong"  
    },
    { 
        test: ["沈阳市", "沈阳"],
        targetCity: "Shenyang",
        targetRegion: "Liaoning"
    },
    { 
        test: ["石家庄"],
        targetCity: "Shijiazhuang",
        targetRegion: "Hebei" 
    },
    { 
        test: ["四川省绵阳市"], 
        targetCity: "Mianyang", 
        targetRegion: "Sichuan" 
    },
    { 
        test: ["苏州"], 
        targetCity: "Suzhou", 
        targetRegion: "Jiangsu" 
    },
    { 
        test: ["太原"], 
        targetCity: "Taiyuan", 
        targetRegion: "Shanxi" 
    },
    { 
        test: ["泰州"], 
        targetCity: "Taizhou", 
        targetRegion: "Jiangsu" 
    },
    { 
        test: ["唐山市"], 
        targetCity: "Tangshan", 
        targetRegion: "Hebei" 
    },
    { 
        test: ["温州"], 
        targetCity: "Wenzhou", 
        targetRegion: "Zhejiang" 
    },
    { 
        test: ["武汉", "武汉市", "wuhan"], 
        targetCity: "Wuhan", 
        targetRegion: "Hubei" 
    },
    { 
        test: ["西安", "西安市", "xian", "xi\'an", "xi‘an"], 
        targetCity: "Xi'an", 
        targetRegion: "Shaanxi" 
    },
    { 
        test: ["盐城市"], 
        targetCity: "Yancheng", 
        targetRegion: "Jiangsu" 
    },
    { 
        test: ["长沙", "长沙市"], 
        targetCity: "Changsha", 
        targetRegion: "Hunan" 
    },
    { 
        test: ["珠海"], 
        targetCity: "Zhuhai", 
        targetRegion: "Guangdong" 
    },
    { 
        test: ["咸阳"], 
        targetCity: "Xianyang", 
        targetRegion: "Shaanxi" 
    },
    { 
        test: ["郑州"], 
        targetCity: "Zhengzhou", 
        targetRegion: "Henan" 
    },
    { 
        test: ["无锡"], 
        targetCity: "Wuxi", 
        targetRegion: "Jiangsu" 
    },
    { 
        test: ["哈尔滨", "道里"], 
        targetCity: "Harbin", 
        targetRegion: "Heilongjiang" 
    },
    { 
        test: ["合肥"], 
        targetCity: "Hefei", 
        targetRegion: "Anhui" 
    },
    { 
        test: ["长春"], 
        targetCity: "Changchun", 
        targetRegion: "Jilin" 
    },
    { 
        test: ["慈溪"],
        targetCity: "Cixi",
        targetRegion: "Zhejiang"
    },
    { 
        test: ["南宁"],
        targetCity: "Nanning",
        targetRegion: "Guangxi" 
    },
    { 
        test: ["余姚"], 
        targetCity: "Yuyao", 
        targetRegion: "Zhejiang" 
    },
    { 
        test: ["烟台"], 
        targetCity: "Yantai", 
        targetRegion: "Shandong" 
    },
    { 
        test: ["汉中"], 
        targetCity: "Hanzhong", 
        targetRegion: "Shaanxi" 
    },
    { 
        test: ["德阳"], 
        targetCity: "Deyang", 
        targetRegion: "Sichuan" 
    },
    { 
        test: ["天津"], 
        targetCity: "Tianjin", 
        targetRegion: "Tianjin" 
    },
    { 
        test: ["大连"], 
        targetCity: "Dalian", 
        targetRegion: "Liaoning" 
    },
    { 
        test: ["银川"], 
        targetCity: "Yinchuan", 
        targetRegion: "Ningxia" 
    },
    { 
        test: ["昆明", "kunmign"], 
        targetCity: "Kunming", 
        targetRegion: "Yunnan" 
    },
    { 
        test: ["广阳"], 
        targetCity: "Guangyang", 
        targetRegion: "Hebei" 
    },
    { 
        test: ["济南"], 
        targetCity: "Jinan", 
        targetRegion: "Shandong" 
    },
    { 
        test: ["惠州"], 
        targetCity: "Huizhou", 
        targetRegion: "Guangdong" 
    },
      {
        test: ["德阳"], 
        targetCity: "Deyang", 
        targetRegion: "Sichuan" 
    },
    {
        test: ["澳门", "macao"], 
        targetCity: "Macau", 
        targetRegion: "Macau" 
    },
    {
        test: ["香港"], 
        targetCity: "HongKong", 
        targetRegion: "HongKong" 
    }
    // 你可以在此处添加更多规则...
  ];
  
  // 检查是否有 Location 属性
  if (inputObject.hasOwnProperty('location')) {
    // 检查 Location.city 是否存在
    if (inputObject.location.hasOwnProperty('city')) {
      // 将城市转化为小写以进行比较
      let cityLowerCase = inputObject.location.city.toLowerCase().replace(/\s+/g, '');
      // 匹配规则列表
      for (let rule of ruleList) {
        // 对规则列表中的每一项进行小写处理再比较
        for(let t of rule.test) {
            if(_.includes(cityLowerCase, t) || _.includes(cityLowerCase, rule.targetCity.toLowerCase())){
                inputObject.location.city = rule.targetCity;
                inputObject.location.region = rule.targetRegion;
                return inputObject;
            }
        }
      }
      console.log('未识别地址', inputObject.location.city);
    }
    
  }

  return inputObject;
}

export default cleaningLocation;