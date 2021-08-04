import {Table, Pagination} from "@appquality/appquality-design-system";
import useAvailableCampaigns from "../../store/dashboard/useAvailableCampaigns";

const AvailableCampaignsTable = () => {
    const {campaigns, page, total} = useAvailableCampaigns();

    return (
        <>
            <Table
                dataSource={campaigns}
                columns={[
                    {
                        title: 'Campaign',
                        dataIndex: 'campaignName',
                        key: 'campaignName'
                    },
                    {
                        title: 'Type',
                        dataIndex: 'type',
                        key: 'type'
                    },
                    {
                        title: 'Start Date',
                        dataIndex: 'startDate',
                        key: 'startDate',
                    },
                    {
                        title: 'End Date',
                        dataIndex: 'endDate',
                        key: 'endDate',
                    },
                    {
                        title: 'Actions',
                        dataIndex: 'actions',
                        key: 'actions'
                    }
                ]}
            />
            {(total >10 )? <Pagination onPageChange={page.set} current={page.current} maxPages={Math.ceil(total/10)}/> : null}
        </>
    );
};

export default AvailableCampaignsTable;
