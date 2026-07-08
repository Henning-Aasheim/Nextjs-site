'use client'

import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale,
    BarElement, 
    Title, 
    Tooltip, 
    Legend 
} from 'chart.js';

ChartJS.register(
    CategoryScale, 
    LinearScale,
    BarElement, 
    Title, 
    Tooltip, 
    Legend,
)

export function BarChart({ data }: { data: any }) {
    const options = {
        plugins: {
            tooltip: {
                backgroundColor: 'rgba(101, 101, 126, 1)',
                bodyColor: 'rgba(223, 198, 175, 1)',
            }
        }
    }
    return <Bar data={data} options={options} />
}
