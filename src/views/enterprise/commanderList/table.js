export const columns = [
  {
    type: 'checkbox',
  },
  // {
  // 	align: 'center',
  // 	field: 'id',
  // 	title: 'ID',
  // 	width: 100
  // },
  // {
  // 	align: 'center',
  // 	field: 'sfUserId',
  // 	title: '师傅用户ID',
  // 	width: 100
  // },
  {
    align: 'center',
    field: 'sfUserName',
    title: '团长名称',
    width: 100,
  },
  {
    align: 'center',
    field: 'sfUserPhone',
    title: '团长手机号',
    width: 100,
  },
  {
    align: 'center',
    // fixed: 'right',
    field: 'status',
    title: '状态',
    showOverflow: 'tooltip',
    slots: {
      default: 'status',
    },
    width: 80,
  },
  {
    align: 'left',
    field: 'sfUserWorkCity',
    title: '团长主营区域',
    // className: 'vxe-cell-two-row',
    showOverflow: 'tooltip',
    width: 150,
    slots: {
      default: 'sfUserWorkCity',
    },
  },
  // {
  // 	align: 'center',
  // 	field: 'zzUserId',
  // 	title: '店长用户ID',
  // 	width: 100
  // },
  {
    align: 'center',
    field: 'zzUserName',
    title: '所属店长名称',
    width: 100,
  },
  {
    align: 'center',
    field: 'zzUserPhone',
    title: '店长手机号',
    width: 100,
  },
  {
    align: 'center',
    field: 'zzUserServerCity',
    title: '服务区域',
    // width: 150,
    slots: {
      default: 'zzUserServerCity',
    },
  },

  {
    align: 'center',
    field: 'cause',
    title: '审核不通过原因',
    width: 180,
  },
  {
    align: 'left',
    field: 'operate',
    fixed: 'right',
    title: '操作',
    className: 'small-padding fixed-width',
    showOverflow: 'tooltip',
    slots: {
      default: 'operate',
    },
    width: 360,
  },
];


export const provinceData = [
  {
    nameProv: '广东省',
    codeProv: '44'
  },
  {
    nameProv: '北京市',
    codeProv: '11'
  },
  {
    nameProv: '上海市',
    codeProv: '31'
  },
  {
    nameProv: '天津市',
    codeProv: '12'
  },
  {
    nameProv: '重庆市',
    codeProv: '50'
  },
  {
    nameProv: '河北省',
    codeProv: '13'
  },
  {
    nameProv: '山西省',
    codeProv: '14'
  },
  {
    nameProv: '河南省',
    codeProv: '41'
  },
  {
    nameProv: '辽宁省',
    codeProv: '21'
  },
  {
    nameProv: '吉林省',
    codeProv: '22'
  },
  {
    nameProv: '黑龙江省',
    codeProv: '23'
  },
  {
    nameProv: '内蒙古自治区',
    codeProv: '15'
  },
  {
    nameProv: '江苏省',
    codeProv: '32'
  },
  {
    nameProv: '山东省',
    codeProv: '37'
  },
  {
    nameProv: '安徽省',
    codeProv: '34'
  },
  {
    nameProv: '浙江省',
    codeProv: '33'
  },
  {
    nameProv: '福建省',
    codeProv: '35'
  },
  {
    nameProv: '湖北省',
    codeProv: '42'
  },
  {
    nameProv: '湖南省',
    codeProv: '43'
  },
  {
    nameProv: '广西壮族自治区',
    codeProv: '45'
  },
  {
    nameProv: '江西省',
    codeProv: '36',
  },
  {
    nameProv: '四川省',
    codeProv: '51'
  },
  {
    nameProv: '海南省',
    codeProv: '46'
  },
  {
    nameProv: '贵州省',
    codeProv: '52'
  },
  {
    nameProv: '云南省',
    codeProv: '53'
  },
  {
    nameProv: '西藏自治区',
    codeProv: '54'
  },
  {
    nameProv: '陕西省',
    codeProv: '61'
  },
  {
    nameProv: '甘肃省',
    codeProv: '62'
  },
  {
    nameProv: '青海省',
    codeProv: '63'
  },
  {
    nameProv: '宁夏回族自治区',
    codeProv: '64'
  },
  {
    nameProv: '新疆维吾尔自治区',
    codeProv: '65'
  },
  {
    nameProv: '香港',
    codeProv: '81'
  },
  {
    nameProv: '澳门',
    codeProv: '82'
  },
  {
    nameProv: '台湾省',
    codeProv: '71'
  }
]
