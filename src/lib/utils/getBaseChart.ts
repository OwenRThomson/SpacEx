import type { ApexOptions } from 'apexcharts';

/*

Just applies default styling to given chart data

*/

export function getBaseChartOptions(series: ApexAxisChartSeries, categories: object): ApexOptions {
	return {
		chart: {
			height: '300px',
			width: '100%',
			type: 'line',
			fontFamily: 'Inter, sans-serif',
			dropShadow: { enabled: false },
			toolbar: { show: false }
		},
		tooltip: { enabled: true, x: { show: false } },
		dataLabels: { enabled: false },
		stroke: { width: 6, curve: 'smooth' },
		grid: {
			show: true,
			strokeDashArray: 4,
			padding: { left: 2, right: 2, top: -26 }
		},
		series,
		legend: { show: false },
		xaxis: {
			categories,
			labels: {
				show: true,
				style: {
					fontFamily: 'Inter, sans-serif',
					cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
				}
			},
			axisBorder: { show: false },
			axisTicks: { show: false }
		},
		yaxis: { show: false }
	};
}
