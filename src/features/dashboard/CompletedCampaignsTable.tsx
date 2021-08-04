import {Table} from "@appquality/appquality-design-system";

const CompletedCampaignsTable = () => {
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
                        title: 'End date',
                        dataIndex: 'endate',
                        key: 'endate',
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

export default CompletedCampaignsTable;
