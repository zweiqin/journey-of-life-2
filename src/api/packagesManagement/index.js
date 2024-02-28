import request2 from '@/utils/request2'
export const api = {
  partnerPage: '/communityTJ/partnerPage'
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