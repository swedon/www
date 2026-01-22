'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const getImageUrl = (zone) => `https://helltides.com/images/map/bosses/${zone.toLowerCase().replace(/\s+/g, '_')}.png`;

const ALERT_OPTIONS = [60, 30, 20, 15, 10, 5, 4, 3, 2, 1];
const SMALL_ALERT_OPTIONS = [5, 4, 3, 2, 1];
const OTHER_ALERT_OPTIONS = [60, 30, 20, 15, 10];
const ALERTS_STORAGE_KEY = 'diablo-worldboss-alerts-enabled-v1';
const ALERT_VOLUME_STORAGE_KEY = 'diablo-worldboss-alert-volume-v1';

function speakWorldBossAlert({ minutesLeft, bossName, location, volume }) {
    try {
        if (!('speechSynthesis' in window)) return;
        const whenText = minutesLeft === 1 ? '1 minute' : `${minutesLeft} minutes`;
        const bossText = bossName ? `${bossName} ` : 'World boss ';
        const locationText = location ? ` at ${location}` : '';
        const utterance = new SpeechSynthesisUtterance(`${bossText}spawns in ${whenText}${locationText}.`);
        utterance.lang = 'en-US';
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = typeof volume === 'number' ? Math.max(0, Math.min(1, volume)) : 1;

        // Helps some browsers initialize voices.
        window.speechSynthesis.getVoices();

        // Avoid stacking speech if multiple alerts fire near each other.
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    } catch {
        // ignore
    }
}

export default function DiabloPage() {
    const [nextBoss, setNextBoss] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alertsEnabled, setAlertsEnabled] = useState(() => {
        const defaults = Object.fromEntries(ALERT_OPTIONS.map((m) => [m, false]));
        if (typeof window === 'undefined') return defaults;
        try {
            const raw = window.localStorage.getItem(ALERTS_STORAGE_KEY);
            if (!raw) return defaults;
            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== 'object') return defaults;
            const merged = { ...defaults };
            for (const minutes of ALERT_OPTIONS) {
                if (typeof parsed[minutes] === 'boolean') merged[minutes] = parsed[minutes];
            }
            return merged;
        } catch {
            return defaults;
        }
    });

    const [alertVolume, setAlertVolume] = useState(() => {
        if (typeof window === 'undefined') return 1;
        try {
            const raw = window.localStorage.getItem(ALERT_VOLUME_STORAGE_KEY);
            const parsed = raw == null ? null : Number(raw);
            if (!Number.isFinite(parsed)) return 1;
            return Math.max(0, Math.min(1, parsed));
        } catch {
            return 1;
        }
    });

    const previousTimeLeftRef = useRef(null);
    const firedAlertsRef = useRef(new Set());
    const isRefreshingRef = useRef(false);
    const pipWindowRef = useRef(null);

    const enabledAlertThresholdsSeconds = useMemo(() => {
        return ALERT_OPTIONS
            .filter((minutes) => alertsEnabled[minutes])
            .map((minutes) => minutes * 60)
            .sort((a, b) => b - a);
    }, [alertsEnabled]);

    const enabledAlertMinutes = useMemo(() => {
        return ALERT_OPTIONS.filter((minutes) => alertsEnabled[minutes]);
    }, [alertsEnabled]);

    useEffect(() => {
        try {
            window.localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alertsEnabled));
        } catch {
            // ignore
        }
    }, [alertsEnabled]);

    useEffect(() => {
        try {
            window.localStorage.setItem(ALERT_VOLUME_STORAGE_KEY, String(alertVolume));
        } catch {
            // ignore
        }
    }, [alertVolume]);

    const writePiPDocument = useCallback((pipWindow, bossInfo, initialTimeLeftSeconds) => {
        if (!pipWindow) return;
        const bgImage = bossInfo?.location ? getImageUrl(bossInfo.location) : '';

        pipWindow.document.open();
        pipWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    html, body { height: 100%; }
                    body {
                        font-family: Arial, sans-serif;
                        position: relative;
                        height: 100vh;
                        margin: 0;
                        overflow: hidden;
                        background-image: url('${bgImage}');
                        background-size: 180% 180%;
                        background-position: center;
                        background-repeat: no-repeat;
                        color: #ffffff;
                        text-align: center;
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.85);
                    }
                    #boss {
                        position: absolute;
                        top: 8px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 22px;
                        font-weight: 700;
                        color: #facc15; /* tailwind yellow-400 */
                        white-space: nowrap;
                        max-width: 96%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    #location {
                        position: absolute;
                        top: 32px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 14px;
                        font-weight: 600;
                        color: #d1d5db; /* tailwind gray-300 */
                        white-space: nowrap;
                        max-width: 96%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    #timer {
                        position: absolute;
                        bottom: 4px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 32px;
                        font-weight: 800;
                        letter-spacing: 0.02em;
                        color: ${
                            initialTimeLeftSeconds < 60
                                ? '#ef4444'
                                : initialTimeLeftSeconds < 300
                                    ? '#fb923c'
                                    : '#4ade80'
                        }; /* red-500 / orange-400 / green-400 */
                        white-space: nowrap;
                    }
                </style>
            </head>
            <body>
                <div id="boss">${bossInfo?.boss ?? 'Loading...'}</div>
                <div id="location">${bossInfo?.location ?? ''}</div>
                <div id="timer"></div>
                <script>
                    const format = (seconds) => {
                        if (seconds <= 0) return '00:00:00';
                        const hours = Math.floor(seconds / 3600);
                        const mins = Math.floor((seconds % 3600) / 60);
                        const secs = seconds % 60;
                        return hours.toString().padStart(2, '0') + ':' + mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');
                    };

                    let time = ${Number.isFinite(initialTimeLeftSeconds) ? initialTimeLeftSeconds : 0};
                    const timerEl = document.getElementById('timer');
                    timerEl.textContent = format(time);

                    const interval = setInterval(() => {
                        time--;
                        if (time < 0) {
                            clearInterval(interval);
                            timerEl.textContent = '00:00:00';
                            timerEl.style.color = '#ef4444';
                        } else {
                            timerEl.textContent = format(time);
                            timerEl.style.color = time < 60 ? '#ef4444' : (time < 300 ? '#fb923c' : '#4ade80');
                        }
                    }, 1000);
                </script>
            </body>
            </html>
        `);
        pipWindow.document.close();
    }, []);

    const fetchBossData = useCallback(
        async ({ silent = false } = {}) => {
            try {
                if (!silent) setLoading(true);
                setError(null);

                const response = await fetch('https://helltides.com/api/schedule');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();

                const now = new Date();
                const bosses = Array.isArray(data?.world_boss) ? data.world_boss : [];
                const next =
                    bosses.find((b) => {
                        const t = new Date(b?.startTime);
                        return Number.isFinite(t.getTime()) && t > now;
                    }) ?? bosses[0];

                if (!next) throw new Error('No world boss data available');

                const spawnTime = new Date(next.startTime);
                const location = next?.zone?.[0]?.name ?? 'Unknown';
                const bossName = next?.boss ?? 'World boss';

                const initialTimeLeft = Math.floor((spawnTime - new Date()) / 1000);
                setNextBoss({ boss: bossName, spawnTime, location });
                setTimeLeft(initialTimeLeft);

                previousTimeLeftRef.current = initialTimeLeft;
                firedAlertsRef.current = new Set();

                // If PiP is open, rewrite it on refresh.
                if (pipWindowRef.current) {
                    writePiPDocument(pipWindowRef.current, { boss: bossName, location }, initialTimeLeft);
                }

                if (!silent) setLoading(false);
            } catch (err) {
                setError(err?.message ?? 'Unknown error');
                if (!silent) setLoading(false);
            }
        },
        [writePiPDocument]
    );

    useEffect(() => {
        fetchBossData({ silent: false });
    }, [fetchBossData]);

    useEffect(() => {
        if (!nextBoss?.spawnTime) return;

        const tick = () => {
            setTimeLeft(Math.floor((nextBoss.spawnTime - new Date()) / 1000));
        };

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [nextBoss]);

    useEffect(() => {
        if (!nextBoss) return;
        if (timeLeft > -60) return;
        if (isRefreshingRef.current) return;

        isRefreshingRef.current = true;
        fetchBossData({ silent: true }).finally(() => {
            isRefreshingRef.current = false;
        });
    }, [timeLeft, nextBoss, fetchBossData]);

    useEffect(() => {
        if (!nextBoss) return;
        if (!enabledAlertThresholdsSeconds.length) return;
        if (typeof timeLeft !== 'number') return;

        const previousTimeLeft = previousTimeLeftRef.current;
        previousTimeLeftRef.current = timeLeft;

        if (previousTimeLeft == null) return;
        if (timeLeft <= 0) return;

        for (const thresholdSeconds of enabledAlertThresholdsSeconds) {
            if (firedAlertsRef.current.has(thresholdSeconds)) continue;
            const crossed = previousTimeLeft > thresholdSeconds && timeLeft <= thresholdSeconds;
            const exact = previousTimeLeft === thresholdSeconds && timeLeft === thresholdSeconds;
            if (crossed || exact) {
                firedAlertsRef.current.add(thresholdSeconds);
                const minutesLeft = Math.round(thresholdSeconds / 60);
                speakWorldBossAlert({
                    minutesLeft,
                    bossName: nextBoss?.boss,
                    location: nextBoss?.location,
                    volume: alertVolume,
                });
            }
        }
    }, [timeLeft, enabledAlertThresholdsSeconds, nextBoss, alertVolume]);

    const playTestAlert = () => {
        if (!enabledAlertMinutes.length) return;
        const randomMinutes = enabledAlertMinutes[Math.floor(Math.random() * enabledAlertMinutes.length)];
        speakWorldBossAlert({
            minutesLeft: randomMinutes,
            bossName: nextBoss?.boss,
            location: nextBoss?.location,
            volume: alertVolume,
        });
    };

    const formatTime = (seconds) => {
        if (!Number.isFinite(seconds) || seconds <= 0) return '00:00:00';
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const openPiP = async () => {
        if (!documentPictureInPicture) {
            alert('Document Picture-in-Picture API not supported');
            return;
        }
        try {
            const pipWindow = await documentPictureInPicture.requestWindow({
                width: 250,
                height: 100,
                disallowReturnToOpener: false,
            });
            pipWindowRef.current = pipWindow;
            pipWindow.addEventListener('pagehide', () => {
                if (pipWindowRef.current === pipWindow) pipWindowRef.current = null;
            });

            writePiPDocument(pipWindow, nextBoss, timeLeft);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="container mx-auto p-4"><p>Loading...</p></div>;
    if (error) return <div className="container mx-auto p-4"><p>Error: {error}</p></div>;

    return (
        <div className="min-h-screen py-8 text-gray-900 dark:text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto rounded-lg p-6 shadow-lg">
                    <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900 dark:text-white">Next World Boss</h2>
                    {nextBoss && (
                        <>
                            <div className="text-center mb-4">
                                <div className="text-2xl font-bold text-yellow-400 mb-2">Boss: {nextBoss.boss}</div>
                                <div className="text-lg text-gray-900 dark:text-gray-300">Location: {nextBoss.location}</div>
                            </div>
                            <div className="flex justify-center relative mb-6">
                                <img src={getImageUrl(nextBoss.location)} alt={nextBoss.location} className="max-w-md rounded-lg shadow-md border-2 border-gray-300 dark:border-gray-600" />
                            </div>
                        </>
                    )}
                    <div className="text-center">
                        <div className={`text-5xl font-mono font-bold mb-4 ${timeLeft < 60 ? 'text-red-500' : (timeLeft < 300 ? 'text-orange-400' : 'text-green-400')}`}>{formatTime(timeLeft)}</div>

                        <div className="mb-6">
                            <div className="text-sm font-semibold text-gray-900 dark:text-gray-300 mb-2">Alerts</div>
                            <div className="flex flex-col items-center gap-2 text-sm text-gray-900 dark:text-gray-300">
                                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                                    {OTHER_ALERT_OPTIONS.map((minutes) => (
                                        <label key={minutes} className="inline-flex items-center gap-2 select-none">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4"
                                                checked={!!alertsEnabled[minutes]}
                                                onChange={(e) =>
                                                    setAlertsEnabled((prev) => ({
                                                        ...prev,
                                                        [minutes]: e.target.checked,
                                                    }))
                                                }
                                            />
                                            {minutes} min
                                        </label>
                                    ))}
                                </div>
                                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                                    {SMALL_ALERT_OPTIONS.map((minutes) => (
                                        <label key={minutes} className="inline-flex items-center gap-2 select-none">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4"
                                                checked={!!alertsEnabled[minutes]}
                                                onChange={(e) =>
                                                    setAlertsEnabled((prev) => ({
                                                        ...prev,
                                                        [minutes]: e.target.checked,
                                                    }))
                                                }
                                            />
                                            {minutes} min
                                        </label>
                                    ))}
                                </div>

                                <div className="flex items-center justify-center gap-3 pt-2">
                                    <span className="text-xs text-gray-900 dark:text-gray-300">Volume</span>
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={Math.round(alertVolume * 100)}
                                        onChange={(e) => setAlertVolume(Number(e.target.value) / 100)}
                                        className="w-40"
                                    />
                                    <span className="w-10 text-xs tabular-nums text-gray-900 dark:text-gray-300 text-right">{Math.round(alertVolume * 100)}%</span>
                                </div>

                                <button
                                    type="button"
                                    onClick={playTestAlert}
                                    disabled={!enabledAlertMinutes.length}
                                    className={`mt-1 px-4 py-2 rounded-lg shadow-md transition duration-200 text-white font-semibold ${
                                        enabledAlertMinutes.length
                                            ? 'bg-gray-600 hover:bg-gray-700'
                                            : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    Test alert
                                </button>
                            </div>
                            <div className="mt-2 text-xs text-gray-900 dark:text-gray-400">
                                Note: For speech alerts and the overlay to work properly, you may need to click or interact with the page first!
                            </div>
                        </div>

                        <button onClick={openPiP} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-200">Open Overlay</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
