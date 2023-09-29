import request from '@/utils/request';

export const api = {
  queryShopGoodsList: '/api/shopgoods/queryShopGoodsList',
  saveShopGoods: '/api/shopgoods/saveShopGoods',
  editShopGoods: '/api/shopgoods/editShopGoods',
  deleteByIdShopGoods: '/api/shopgoods/deleteByIdShopGoods',
  upperShopGoods: '/api/shopgoods/upperShopGoods',
  getByIdShopGoodsInfo: '/api/shopgoods/getByIdShopGoodsInfo',
  queryShopGoodsTypeList: '/api/shopgoods/queryShopGoodsTypeList',
  saveShopGoodsType: '/api/shopgoods/saveShopGoodsType',
  editShopGoodsType: '/api/shopgoods/editShopGoodsType',
  deleteByIdShopGoodsType: '/api/shopgoods/deleteByIdShopGoodsType',
  getByIdShopGoodsTypeInfo: '/api/shopgoods/getByIdShopGoodsTypeInfo',
  queryVoucherGoodsList: '/api/shopgoods/queryShopVoucherList',
  createVoucherGoods: '/api/shopgoods/saveShopVoucher',
  getVoucherGoodsDetail: '/api/shopgoods/getByIdShopVoucherInfo',
  editVoucherGoodsDetail: '/api/shopgoods/editShopVoucher',
  deleteVoucherGoods: '/api/shopgoods/deleteByIdShopVoucher',
};

// 服务列表
export function queryShopGoodsList(data) {
  return request({
    url: api.queryShopGoodsList,
    method: 'POST',
    data,
  });
}

// 新增服务
export function saveShopGoods(data) {
  return request({
    url: api.saveShopGoods,
    method: 'POST',
    data,
  });
}

// 编辑服务
export function editShopGoods(data) {
  return request({
    url: api.editShopGoods,
    method: 'POST',
    data,
  });
}

// 删除服务
export function deleteByIdShopGoods(params) {
  return request({
    url: api.deleteByIdShopGoods,
    method: 'DELETE',
    params,
  });
}

// 上下架服务
export function upperShopGoods({ shopGoodsId }) {
  const formData = new FormData();
  formData.append('shopGoodsId', shopGoodsId);
  return request({
    url: api.upperShopGoods,
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
    },
    method: 'POST',
    data: formData,
  });
}

// 服务详情
export function getByIdShopGoodsInfo(params) {
  return request({
    url: api.getByIdShopGoodsInfo,
    method: 'GET',
    params,
  });
}

// 分类列表
export function queryShopGoodsTypeList(data) {
  return request({
    url: api.queryShopGoodsTypeList,
    method: 'POST',
    data,
  });
}

// 新增服务分类
export function saveShopGoodsType(data) {
  return request({
    url: api.saveShopGoodsType,
    method: 'POST',
    data,
  });
}

// 修改服务分类
export function editShopGoodsType(data) {
  return request({
    url: api.editShopGoodsType,
    method: 'POST',
    data,
  });
}

// 删除服务分类
export function deleteByIdShopGoodsType(params) {
  return request({
    url: api.deleteByIdShopGoodsType,
    method: 'DELETE',
    params,
  });
}

// 服务详情
export function getByIdShopGoodsTypeInfo(params) {
  return request({
    url: api.getByIdShopGoodsTypeInfo,
    method: 'GET',
    params,
  });
}

// 代金券商品
export function queryVoucherGoodsList(data) {
  return request({
    url: api.queryVoucherGoodsList,
    method: 'POST',
    data,
  });
}

// 创建代金券商品
export function createVoucherGoods(data) {
  return request({
    url: api.createVoucherGoods,
    method: 'POST',
    data,
  });
}

// 获取商品/服务代金券版详情
export function getVoucherGoodsDetail(params) {
  return request({
    url: api.getVoucherGoodsDetail,
    params,
    method: 'GET',
  });
}

// 修改代金券商品/ 服务详情
export function editVoucherGoodsDetail(data) {
  return request({
    url: api.editVoucherGoodsDetail,
    data,
    method: 'POST',
  });
}

// 删除代金券商品
export function deleteVoucherGoods(params) {
  return request({
    url: api.deleteVoucherGoods,
    params,
    method: 'DELETE',
  });
}
