import MinHeader from '@/components/trade-comps/min-header'
import TradingviewScreen from '@/components/trade-comps/TradingviewScreen'
import Orderbook from '@/components/trade-comps/Orderbook'
import TradeSidebar from '@/components/trade-comps/TradeSidebar'
import TradeOrderHistory from '@/components/trade-comps/TradeOrderHistory'

export default function Home() {
    return (
        <div className="min-h-screen">
            <MinHeader />

            <div className="trade-layout w-full">
                <div className="trading-view-screen rounded-r-[8px]">
                    <TradingviewScreen />
                </div>
                <div className="order-book rounded-[8px]">
                    <Orderbook />
                </div>
                <div className="trade-sidebar rounded-[8px] overflow-hidden">
                    <TradeSidebar />
                </div>
                <div className="trade-order-history rounded-r-[8px]">
                    <TradeOrderHistory />
                </div>
            </div>
        </div>
    )
}
