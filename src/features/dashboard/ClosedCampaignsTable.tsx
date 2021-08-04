import {Table} from "@appquality/appquality-design-system";

const ClosedCampaignsTable = () => {
    return (
        <>
            <Table
                dataSource={[]}
                columns={[
                    {
                        title: 'Campaign',
                        dataIndex: 'campaigns',
                        key: 'campaigns'
                    },
                    {
                        title: 'Close date',
                        dataIndex: 'closedate',
                        key: 'closedate',
                    }
                ]}
            />
            {/*//if rows are more than 10 show pagination*/}
            {/*<Pagination/>*/}
        </>
    );
};

export default ClosedCampaignsTable;
