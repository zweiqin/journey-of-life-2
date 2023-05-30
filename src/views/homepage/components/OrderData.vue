<template>
	<div style="padding: 0 10px;">
		<el-row :gutter="20" class="panel-group">
			<el-col
				v-for="(item, index) in data" v-if="index < 3" :key="index" :span="8"
				class="card-panel-col"
			>
				<div class="card-panel" :style="{ cursor: item.to ? 'pointer' : 'default' }" @click="item.to && $router.push({ name: item.to })">
					<div class="card-panel-description">
						<div class="card-panel-text">{{ item.name }}</div>
						<div class="card-panel-count">{{ item.count }}</div>
					</div>
					<div class="card-panel-icon-wrapper">
						<svg-icon :icon-class="item.icon" class-name="card-panel-icon" />
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20" class="panel-group">
			<el-col
				v-for="(item, index) in data" v-if="index >= 3 && index < 6" :key="index" :span="8"
				class="card-panel-col"
			>
				<div class="card-panel" :style="{ cursor: item.to ? 'pointer' : 'default' }" @click="item.to && $router.push({ name: item.to })">
					<div class="card-panel-description">
						<div class="card-panel-text">{{ item.name }}</div>
						<div class="card-panel-count">{{ item.count }}</div>
					</div>
					<div class="card-panel-icon-wrapper">
						<svg-icon :icon-class="item.icon" class-name="card-panel-icon" />
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20" class="panel-group">
			<el-col
				v-for="(item, index) in data" v-if="index >= 6 && index < 9" :key="index" :span="8"
				class=""
			>
				<div v-if="index == 6 || index == 7 || index == 8" class="card-panel" :style="{ cursor: item.to ? 'pointer' : 'default' }" @click="item.to && $router.push({ name: item.to })">
					<div class="card-panel-description">
						<div class="card-panel-text">{{ item.name }}</div>
						<div class="card-panel-count">{{ item.count }}</div>
					</div>
					<div class="card-panel-icon-wrapper">
						<svg-icon :icon-class="item.icon" class-name="card-panel-icon" />
					</div>
				</div>
				<div v-else class="card-panel card-panel-danger">
					<div class="card-panel-description">
						<div class="card-panel-text">{{ item.name }}</div>
						<div class="card-panel-count">{{ item.count }}</div>
					</div>
					<div class="card-panel-icon-wrapper">
						<svg-icon :icon-class="item.icon" class-name="card-panel-icon" />
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
// import { formatDate } from '@/utils/date'

export default {
	name: 'OrderData',
	props: {
		data: {
			type: Array,
			default: () => [{
				icon: 'h-homePage8',
				name: '总金额',
				count: 0
			}, {
				icon: 'h-homePage8',
				name: '累计订单',
				count: 0
			}, {
				icon: 'h-homePage7',
				name: '今日订单',
				count: 0
			}, {
				icon: 'h-homePage2',
				name: '待报价',
				count: 0,
				to: 'ReceivingList'
			}, {
				icon: 'h-homePage1',
				name: '待接单',
				count: 0,
				to: 'ReceivingList'
			}, {
				icon: 'h-homePage3',
				name: '待分配',
				count: 0,
				to: 'ReceivingList'
			}, {
				icon: 'h-homePage4',
				name: '待到场',
				count: 0
			}, {
				icon: 'h-homePage5',
				name: '完成订单',
				count: 0
			}, {
				icon: 'h-homePage6',
				name: '异常订单',
				count: 0,
				to: 'AbnormalOrder'
			}]
		}
	},
	watch: {
	}
}
</script>

<style lang="scss" scoped>
.panel-group {
	.card-panel-col {
		margin-bottom: 12px;
	}

	.card-panel {
		display: flex;
		justify-content: space-between;
		height: 90px;
		font-size: 12px;
		position: relative;
		color: #666;
		overflow: hidden;
		background-size: cover;
		box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);

		.card-panel-icon-wrapper {
			width: 48px;
			height: 48px;
			margin-top: 24px;
			margin-left: 16px;

			.card-panel-icon {
				width: 100%;
				height: 100%;
			}
		}

		.card-panel-description {
			.card-panel-text {
				width: 68px;
				height: 22px;
				margin-top: 22px;
				margin-left: 12px;
				font-size: 16px;
				font-weight: normal;
				line-height: 22px;
				letter-spacing: 0em;
				color: #3D3D3D;
			}

			.card-panel-count {
				width: 106px;
				height: 36px;
				margin-top: 2px;
				margin-left: 8px;
				font-size: 28px;
				font-weight: bold;
				line-height: 36px;
				letter-spacing: 0em;
				color: #333333;
			}
		}
	}
}
</style>
