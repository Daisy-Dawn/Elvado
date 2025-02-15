import React, { useEffect, useRef, memo } from 'react'

const TradingViewWidget: React.FC = () => {
    const container = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!container.current) return

        // Prevent duplication by checking if script already exists
        if (document.getElementById('tradingview-widget-script')) return

        const script = document.createElement('script')
        script.id = 'tradingview-widget-script' // Unique ID to prevent duplication
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js'
        script.type = 'text/javascript'
        script.async = true
        script.innerHTML = JSON.stringify({
            symbols: [['COINBASE:BTCUSD|1D']],
            chartOnly: false,
            width: '100%',
            height: '100%',
            locale: 'en',
            colorTheme: 'dark',
            autosize: true,
            showVolume: false,
            showMA: false,
            hideDateRanges: false,
            hideMarketStatus: false,
            hideSymbolLogo: false,
            scalePosition: 'right',
            scaleMode: 'Normal',
            fontFamily: 'Trebuchet MS, sans-serif',
            fontSize: '10',
            noTimeScale: false,
            valuesTracking: '1',
            changeMode: 'price-and-percent',
            chartType: 'area',
            maLineColor: '#2962FF',
            maLineWidth: 1,
            maLength: 9,
            headerFontSize: 'medium',
            backgroundColor: 'rgba(15, 15, 15, 1)',
            widgetFontColor: 'rgba(255, 255, 255, 1)',
            lineWidth: 2,
            lineType: 0,
            dateRanges: [
                '1d|1',
                '1m|30',
                '3m|60',
                '12m|1D',
                '60m|1W',
                'all|1M',
            ],
        })

        container.current.appendChild(script)

        return () => {
            // Clean up by removing the widget when the component unmounts
            if (container.current) {
                container.current.innerHTML = ''
            }
        }
    }, [])

    return (
        <div
            className="tradingview-widget-container w-full h-full"
            ref={container}
        >
            <div className="tradingview-widget-container__widget"></div>
        </div>
    )
}

export default memo(TradingViewWidget)
