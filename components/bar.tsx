'use client'

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)

// components/bar.tsx
const FALLBACK_COLORS = {
    grid: 'rgba(4, 0, 10, 0.08)',
    tick: 'rgba(4, 0, 10, 0.65)',
    border: 'rgba(4, 0, 10, 0.2)',
    legend: 'rgba(4, 0, 10, 0.8)',
    tooltipBg: 'rgba(255, 255, 255, 0.95)',
    tooltipText: 'rgba(4, 0, 10, 0.9)',
    tooltipBorder: 'rgba(4, 0, 10, 0.1)',
    fontFamily: 'Noto Serif, serif',
}

function readCssVar(name: string, fallback: string) {
    if (typeof window === 'undefined') return fallback
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    return value || fallback
}

function useChartTheme() {
    const [mounted, setMounted] = useState(false)
    const [colors, setColors] = useState(FALLBACK_COLORS)

    useEffect(() => {
        const readColors = () => {
            setColors({
                grid: readCssVar('--chart-grid-color', FALLBACK_COLORS.grid),
                tick: readCssVar('--chart-tick-color', FALLBACK_COLORS.tick),
                border: readCssVar('--chart-border-color', FALLBACK_COLORS.border),
                legend: readCssVar('--chart-legend-color', FALLBACK_COLORS.legend),
                tooltipBg: readCssVar('--chart-tooltip-bg', FALLBACK_COLORS.tooltipBg),
                tooltipText: readCssVar('--chart-tooltip-text', FALLBACK_COLORS.tooltipText),
                tooltipBorder: readCssVar('--chart-tooltip-border', FALLBACK_COLORS.tooltipBorder),
                fontFamily: readCssVar('--font-default', FALLBACK_COLORS.fontFamily),
            })
        }

        readColors()
        setMounted(true)

        const observer = new MutationObserver(readColors)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        })

        return () => observer.disconnect()
    }, [])

    return { colors, mounted }
}

export function BarChart({ data }: { data: any }) {
    const { colors, mounted } = useChartTheme()

    const font = { family: colors.fontFamily, size: 14 }

    const options = {
        responsive: true,
        aspectRatio: 1.6,
        plugins: {
            legend: {
                labels: { color: colors.legend, font },
            },
            tooltip: {
                backgroundColor: colors.tooltipBg,
                titleColor: colors.tooltipText,
                bodyColor: colors.tooltipText,
                borderColor: colors.tooltipBorder,
                borderWidth: 1,
                titleFont: { ...font, size: 15 },
                bodyFont: font,
            },
        },
        scales: {
            x: {
                ticks: { color: colors.tick, font },
                grid: { color: colors.grid },
                border: { color: colors.border },
            },
            y: {
                ticks: { color: colors.tick, font },
                grid: { color: colors.grid },
                border: { color: colors.border },
            },
        },
    }

    if (!mounted) return null

    return (
        <div className="w-full max-w-2xl mx-auto">
            <Bar data={data} options={options} />
        </div>
    )
}