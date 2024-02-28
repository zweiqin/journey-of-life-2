import request2 from '@/utils/request2'
export const api = {
  partnerPage: '/communityTJ/partnerPage',
  getArea: '/cityManageArea/getTreeOne',
  selectCommunity: '/cityCommunity/selectCommunity',
  apponitComunity: '/cityCommunity/appoint'
};
/**
 * 获取会员订单列表
 */
// 订单详情
export function partnerPage(data) {
  return request2({
    url: api.partnerPage,
    method: 'POST',
    data,
  });
}

// 查询区域列表
export function getAreaList(params) {
  return request2({
    url: api.getArea,
    method: 'GET',
    params
  })
}

// 查询所有2小区列表
export function selectCommunity(params) {
  return request2({
    url: api.selectCommunity,
    method: 'GET',
    params
  })
}

// 指定
export function apponitComunity(data){
  return request2({
    url: api.apponitComunity,
    method: 'POST',
    data
  })
}