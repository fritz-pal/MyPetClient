import { TFunction } from "i18next";

export function timeSince(seconds: number, t: TFunction<"time", undefined>): string {
    const now = new Date();
    const secondsSince = Math.floor((now.getTime() - seconds * 1000) / 1000);

    const interval = Math.floor(secondsSince / 31536000);
    if (interval > 1) {
        return t("years", { number: interval });
    } else if (interval === 1) {
        return t("year", { number: interval });
    }

    const interval2 = Math.floor(secondsSince / 2592000);
    if (interval2 > 1) {
        return t("months", { number: interval2 });
    } else if (interval2 === 1) {
        return t("month", { number: interval2 });
    }

    const interval3 = Math.floor(secondsSince / 86400);
    if (interval3 > 1) {
        return t("days", { number: interval3 });
    } else if (interval3 === 1) {
        return t("day", { number: interval3 });
    }

    const interval4 = Math.floor(secondsSince / 3600);
    if (interval4 > 1) {
        return t("hours", { number: interval4 });
    } else if (interval4 === 1) {
        return t("hour", { number: interval4 });
    }

    const interval5 = Math.floor(secondsSince / 60);
    if (interval5 > 1) {
        return t("minutes", { number: interval5 });
    } else if (interval5 === 1) {
        return t("minute", { number: interval5 });
    }

    return t("justNow");
}