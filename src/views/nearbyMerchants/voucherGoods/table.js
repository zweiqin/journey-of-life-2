export const getColumns = (type) => {
  return [
    {
      align: 'center',
      field: 'goodsName',
      title: `${type}名称`,
      minWidth: 100,
    },
    {
      align: 'center',
      field: 'goodsLogo',
      title: `${type}logo`,
      minWidth: 100,
      slots: {
        default: 'logo',
      },
    },
    {
      align: 'center',
      field: 'shopGoodsType',
      title: `${type}类型`,
      minWidth: 100,
      formatter: ({ row }) => (row.shopGoodsType === 1 ? '商品' : '服务'),
    },
    {
      align: 'center',
      field: 'voucherType',
      title: '活动类型',
      minWidth: 100,
    },
    {
      align: 'center',
      field: 'conditionAmount',
      title: '满减金额',
      width: 100,
    },
    {
      align: 'center',
      field: 'benefitAmount',
      title: '优惠金额',
      width: 80,
    },
    {
      align: 'center',
      field: 'discount',
      title: '折扣',
      minWidth: 150,
    },
    {
      align: 'center',
      field: 'createTime',
      title: '创建时间',
      minWidth: 150,
    },
    {
      align: 'center',
      field: 'operate',
      fixed: 'right',
      title: '操作',
      className: 'small-padding fixed-width',
      showOverflow: 'tooltip',
      slots: {
        default: 'operate',
      },
      width: 200,
    },
  ];
};
