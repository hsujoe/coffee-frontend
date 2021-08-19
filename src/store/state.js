export default {
  barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
  barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
  drawer: null,
  token: '',
  loginState: false,
  errorMessage: '',
  saveState: false,
  updateState: false,
  stateOptions: [
    { text: '啓用', value: 0 },
    { text: '未啓用', value: 1 },
    { text: '推薦', value: 2 }
  ],
  user: {
    id: 0,
    userId: '',
    userName: '',
    password: '',
    image: ''
  },
  products: [],
  productSelectItem: [],
  product: {
    name: '',
    unit: '',
    price: '',
    state: 0,
    memo: ''
  },
  stores: [],
  storeSelectItem: [],
  store: {
    name: '',
    tel: '',
    address: '',
    page: '',
    fb: '',
    ig: '',
    state: 0,
    memo: ''
  },
  coffeeBeans: [],
  coffeeBeanSelectItem: [],
  coffeeBean: {
    sid: 0,
    sname: '',
    origin: '',
    manor: '',
    name: '',
    fermentation: '',
    roast: '',
    acidity: '',
    flavor: '',
    tasting: '',
    description: '',
    image: '',
    state: 0,
    buyDate: '',
    weight: 0,
    price: 0
  },
  brews: [],
  brew: {
    bid: 0,
    bname: '',
    grinder: '',
    scale: '',
    steaming: '',
    waterCuts: '',
    waterTemperature: '',
    totalWater: '',
    description: ''
  },
  runShops: [],
  runShop: {
    sid: 0,
    pid: 0,
    tasting: '',
    memo: '',
    state: 0
  }
}
