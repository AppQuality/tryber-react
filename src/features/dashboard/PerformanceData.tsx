import {icons} from '@appquality/appquality-design-system';
const PerformanceData = () => {
    const {
        AwardFill,
        BookmarkCheckFill,
        BugFill,
        PiggyBankFill,
        StarFill,
        CashCoin,
        ArrowRight
    } = icons;
    return <div>
        <div style={{borderBottom: "1px solid #d1e0e8"}} className={'row'} >
            <div><StarFill/> Experience points</div>
            <div><AwardFill/> Your Rank</div>
            <a>View ranking page <ArrowRight/></a>
        </div>
        <div style={{borderBottom: "1px solid #d1e0e8"}} className={'row'} >
            <div><BookmarkCheckFill/> Completed campaigns</div>
            <div><BugFill/> Approved bugs</div>
            <a>View bugs page <ArrowRight/></a>
        </div>
        <div className={'row'} >
            <div><CashCoin/> All-time booty</div>
            <div><PiggyBankFill/> Reserved booty</div>
            <a>View payments page <ArrowRight/></a>
        </div>
    </div>
};


export default PerformanceData;