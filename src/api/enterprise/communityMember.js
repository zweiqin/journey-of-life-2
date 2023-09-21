import request from '@/utils/request';

export const api = {
  savePartner: '/api/partner/savePartner',
  getPartnerList: '/api/partner/getPartnerList',
  deleteByPartner: '/api/third/tz/operateTzIdentity',
  getPartnerInfo: '/api/partner/getPartnerInfo',
  getCommissionStatement: '/api/partner/getCommissionBySfUserIdList',
  examineSFApply: '/api/third/tz/startAudit',
  apponitCommander: '/api/third/tz/appointUserDoTz',
  getSfList: '/api/third/tz/finUserInfoByKeyword',
  getCities: '/worker/sysArea1/queryCity',
  getCouns: '/worker/sysArea1/queryCoun',
  editPartnerType: '/api/third/tz/updateUserType',
};

// 指定合伙人
export function savePartner(data) {
  return request({
    url: api.savePartner,
    method: 'POST',
    data,
  });
}

// 合伙人信息列表
export function getPartnerList(data) {
  return request({
    url: api.getPartnerList,
    method: 'POST',
    data,
  });
}

// 取消指定
export function deleteByPartner(data) {
  return request({
    url: api.deleteByPartner,
    method: 'POST',
    data,
  });
}

// 合伙人详情接口
export function getPartnerInfo(params) {
  return request({
    url: api.getPartnerInfo,
    method: 'GET',
    params,
  });
}

// 合伙人佣金流水
export function getCommissionStatementList(params) {
  return request({
    url: api.getCommissionStatement,
    method: 'GET',
    params,
  });
}

// 团长审核
export function examineSFApply(data) {
  return request({
    url: api.examineSFApply,
    method: 'POST',
    data,
  });
}

// 指定团长
export function apponitCommander(data) {
  return request({
    url: api.apponitCommander,
    method: 'POST',
    data,
  });
}

// 获取用户
export function getSfList(params) {
  return request({
    url: api.getSfList,
    params,
    method: 'GET',
  });
}

// 获取市数据
export function getCitiesData(data) {
  return request({
    url: api.getCities,
    method: 'POST',
    data,
  });
}

// 获取镇的数据
export function getCounsData(data) {
  return request({
    url: api.getCouns,
    data,
    method: 'POST',
  });
}

// 修改合伙人类型
export function editPartnerType(params) {
  return request({
    url: api.editPartnerType,
    params,
    method: 'get',
  });
}
