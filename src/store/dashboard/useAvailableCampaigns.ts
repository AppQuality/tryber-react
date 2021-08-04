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
        return API.myCampaigns({
            query: {
                filterBy: {
                    completed: '0',
                }
            }
        }).
        then((data:operations['get-users-me-campaigns']['responses']['200']['content']['application/json'])=> {
            if (data && data.results) {
                const campaigns = data.results.map((cp) => {
                    return {
                        key: cp.id ? cp.id : 123,
                        campaignName: cp.name,
                        type: 'tipo cp'
                    }
                });
                return campaigns;
            }
            return [];

        });
    }

    useEffect(() => {
        //
        fetchCampaignsFromApi().
        then((data)=>{
            setCampaigns(data);
        }).catch((e) => {
            if (e.statusCode === 404) {
                setCampaigns([]);
                setTotalEntries(0);
            }
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