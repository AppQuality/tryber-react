import {TableType} from "@appquality/appquality-design-system";
import {useState, useEffect} from "react";
import {operations} from "../../utils/schema";
import i18n from "i18next";
import API from "../../utils/api";

export default () => {

    const [total, setTotal] = useState(0);
    const [campaigns, setCampaigns] = useState<TableType.Row[]>([]);
    const [page, setPage] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0)

    const fetchCampaignsFromApi = () =>{
        return Promise.resolve(
            [
                {
                    key: 123,
                    campaignName: 'Nome Campagna',
                    type: 'tipo campagnaaaaaaa',
                    startDate: '',
                    endDate: '',
                    actions: '',
                }
            ]
        );
    }

    useEffect(() => {

        //
        fetchCampaignsFromApi().
        then((campaigns)=>{
            setCampaigns(campaigns);
        });

    }, [page]);





    return {
        campaigns,
        page: {
            current: page,
            set: setPage
        },
        total
    };
}