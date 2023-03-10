const getters = {
	sidebar: (state) => state.app.sidebar,
	language: (state) => state.app.language,
	size: (state) => state.app.size,
	device: (state) => state.app.device,
	visitedViews: (state) => state.tagsView.visitedViews,
	cachedViews: (state) => state.tagsView.cachedViews,
	token: (state) => state.user.token,
	avatar: (state) => state.user.avatar,
	userId: (state) => state.user.userId,
	name: (state) => state.user.name,
	introduction: (state) => state.user.introduction,
	status: (state) => state.user.status,
	roles: (state) => state.user.roles,
	typ: (state) => state.user.typ,
	perms: (state) => state.user.perms,
	setting: (state) => state.user.setting,
	permission_routers: (state) => state.permission.routers,
	addRouters: (state) => state.permission.addRouters,
	common_regionList: (state) => state.common.common_regionList
}
export default getters
