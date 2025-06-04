import type {Touchpoint} from "@/types/response.ts";
import {ChevronRightIcon} from 'lucide-react';
import React from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const badgeColorSchemes = [
    'bg-blue-50 text-blue-600 border-blue-200',
    'bg-orange-50 text-orange-600 border-orange-200',
    'bg-green-50 text-green-600 border-green-200',
    'bg-pink-50 text-pink-600 border-pink-200',
    'bg-yellow-50 text-yellow-600 border-yellow-200',
    'bg-purple-50 text-purple-600 border-purple-200',
    'bg-sky-50 text-sky-600 border-sky-200',
    'bg-indigo-50 text-indigo-600 border-indigo-200',
    'bg-red-50 text-red-600 border-red-200',
    'bg-emerald-50 text-emerald-600 border-emerald-200',
    'bg-amber-50 text-amber-600 border-amber-200',
    'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200',
    'bg-teal-50 text-teal-600 border-teal-200',
    'bg-cyan-50 text-cyan-600 border-cyan-200',
    'bg-rose-50 text-rose-600 border-rose-200',
    'bg-lime-50 text-lime-600 border-lime-200',
    'bg-violet-50 text-violet-600 border-violet-200',
    'bg-gray-100 text-gray-700 border-gray-300',
    'bg-slate-100 text-slate-700 border-slate-300',
    'bg-zinc-100 text-zinc-700 border-zinc-300',
];

const channelToColorMap = new Map<string, string>();
let colorAssignIndex = 0;

function getBadgeColorForChannel(channel: string): string {
    const normalizedChannel = channel.toLowerCase();
    if (!channelToColorMap.has(normalizedChannel)) {
        const selectedColor = badgeColorSchemes[colorAssignIndex % badgeColorSchemes.length];
        channelToColorMap.set(normalizedChannel, selectedColor);
        colorAssignIndex++;
    }
    return channelToColorMap.get(normalizedChannel)!;
}


const plusBadgeColorClasses = "bg-gray-100 text-gray-700 border-gray-300 tabular-nums";
const baseBadgeClasses = "shrink-0 capitalize inline-flex items-center px-3 py-1 rounded-md text-sm font-medium border";

interface DynamicBadgeDisplayProps {
    touchpoints: Touchpoint[];
    maxVisible?: number;
}

const DEFAULT_MAX_VISIBLE_BADGES = 2;

interface PlusBadgeElement {
    type: 'plus';
    count: number;
    tooltipData: Touchpoint[];
}

export default function DynamicBadgeDisplay({
                                                touchpoints,
                                                maxVisible = DEFAULT_MAX_VISIBLE_BADGES
                                            }: DynamicBadgeDisplayProps) {

    const total = touchpoints.length;

    if (total === 0) {
        return <div className="w-full h-[2.125rem]"/>;
    }

    const displayElements: Array<Touchpoint | PlusBadgeElement> = [];

    if (total <= maxVisible + 1) {
        touchpoints.forEach(tp => displayElements.push(tp));
    } else {


        for (let i = 0; i < maxVisible; i++) {


            if (touchpoints[i]) {
                displayElements.push(touchpoints[i]);
            }
        }


        const hiddenItemsCount = total - maxVisible - 1;
        const hiddenTouchpointsForTooltip = touchpoints.slice(maxVisible, total - 1);


        if (hiddenItemsCount > 0) {
            displayElements.push({
                type: 'plus',
                count: hiddenItemsCount,
                tooltipData: hiddenTouchpointsForTooltip
            });
        }


        displayElements.push(touchpoints[total - 1]);
    }

    return (
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap w-full h-[2.125rem]">
            {displayElements.map((element, index) => (
                <React.Fragment
                    key={('type' in element && element.type === 'plus') ? `plus-badge-${index}` : `touchpoint-${element.id}-${index}-${element.channel}`}>
                    {('type' in element && element.type === 'plus') ? (
                        <TooltipProvider>
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild>
                                    <div className={`${baseBadgeClasses} ${plusBadgeColorClasses} cursor-default`}>
                                        +{element.count}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent
                                    className="p-2 bg-background border rounded-md shadow-lg max-w-xs sm:max-w-sm z-50">
                                    <p className="font-semibold mb-2 text-foreground">Additional Touchpoints
                                        ({element.count}):</p>
                                    <div className="flex flex-col gap-1.5 max-h-60 overflow-y-auto">
                                        {element.tooltipData.map((tp, idx) => (
                                            <div
                                                key={`hidden-${tp.id}-${idx}-${tp.channel}`}
                                                className={`shrink-0 capitalize inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getBadgeColorForChannel(tp.channel)}`}
                                            >
                                                {tp.channel}
                                            </div>
                                        ))}
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : 'channel' in element ? (
                        <div
                            className={`${baseBadgeClasses} ${getBadgeColorForChannel(element.channel)}`}
                        >
                            {element.channel}
                        </div>
                    ) : null

                    }

                    {index < displayElements.length - 1 && (
                        <ChevronRightIcon className="h-4 w-4 text-gray-400 shrink-0"/>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
