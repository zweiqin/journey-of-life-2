import request from '@/utils/request'

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
	getByIdShopGoodsTypeInfo: '/api/shopgoods/getByIdShopGoodsTypeInfo'
}

// 服务列表
export function queryShopGoodsList(data) {
	return request({
		url: api.queryShopGoodsList,
		method: 'POST',
		data
	})
}

// 新增服务
export function saveShopGoods(data) {
	return request({
		url: api.saveShopGoods,
		method: 'POST',
		data
	})
}

// 编辑服务
export function editShopGoods(data) {
	return request({
		url: api.editShopGoods,
		method: 'POST',
		data
	})
}

// 删除服务
export function deleteByIdShopGoods(data) {
	return request({
		url: api.deleteByIdShopGoods,
		method: 'POST',
		data
	})
}

// 上下架服务
export function upperShopGoods(data) {
	return request({
		url: api.upperShopGoods,
		method: 'POST',
		data
	})
}

// 服务详情
export function getByIdShopGoodsInfo(data) {
	return request({
		url: api.getByIdShopGoodsInfo,
		method: 'POST',
		data
	})
}

// 分类列表
export function queryShopGoodsTypeList(data) {
	return request({
		url: api.queryShopGoodsTypeList,
		method: 'POST',
		data
	})
}

// 新增服务分类
export function saveShopGoodsType(data) {
	return request({
		url: api.saveShopGoodsType,
		method: 'POST',
		data
	})
}

// 修改服务分类
export function editShopGoodsType(data) {
	return request({
		url: api.editShopGoodsType,
		method: 'POST',
		data
	})
}

// 删除服务分类
export function deleteByIdShopGoodsType(params) {
	return request({
		url: api.deleteByIdShopGoodsType,
		method: 'DELETE',
		params
	})
}

// 服务详情
export function getByIdShopGoodsTypeInfo(params) {
	return request({
		url: api.getByIdShopGoodsTypeInfo,
		method: 'GET',
		params
	})
}
