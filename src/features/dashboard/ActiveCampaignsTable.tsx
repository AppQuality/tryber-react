import {
    Table
} from "@appquality/appquality-design-system";
import {campaigns} from "../../utils/campaigns";

const ActiveCampaignsTable = () => {

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
                        title: 'End Date',
                        dataIndex: 'endate',
                        key: 'endate',
                        isSortable: true,
                        // onSort: (sorting: "ASC" | "DESC") => {
                        //     order.set(sorting);
                        //     orderBy.set("endate");
                        // },
                    },
                    {
                        title: 'Actions',
                        dataIndex: '',
                        key: 'actions'
                    }
                ]}
            />
            {/*//if rows are more than 10 show pagination*/}
            {/*<Pagination/>*/}
        </>
    );
};

export default ActiveCampaignsTable;
