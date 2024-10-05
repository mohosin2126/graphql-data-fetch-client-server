import { gql } from '@apollo/client';

export const ADMIN_OFFER_ALL = gql`
    query AdminGetAllOffers(
        $name: String,
        $advertiser_id: ID
        $status:  String
        $model: OfferModel
        $page: Int,
        $limit: Int,
    ) {
        offers(
            name: $name,
            advertiser_id: $advertiser_id,
            status: $status,
            model: $model,
            page: $page
            first: $limit
        ) {
            data {
                id
                thumbnail
                name
                advertiser {
                    id
                    first_name
                    last_name
                    company
                }
                status
                model
                currency {
                    id
                    code
                    symbol
                }
                revenue
                payout
                created_at
                countries {
                    code
                    name
                }
                categories {
                    id
                    name
                }
            }
            paginatorInfo {
                perPage
                lastPage
                lastItem
                hasMorePages
                firstItem
                currentPage
                count
            }
        }
    }
`;

export const ADMIN_OFFER_ONE = gql`
    query AdminGetOneOffers(
        $id: ID!,
    ) {
        offer(
            id: $id
        ) {
            id
            thumbnail
            name
            advertiser {
                id
            }
                currency {
                id
                }
            status
            model
            currency {
                id
                code
                symbol
            }
            revenue
            payout
            preview_link
            tracking_link
            description
            short_description
            created_at
            updated_at
            categories {
                id
                name
            }
            countries {
                code
                name
            }
            devices {
                name
            }
            platforms {
                name
            }
            browsers {
                name
            }
            events {
                id
                name
                revenue
                payout
                model
            }
        }
    }
`;


export const ADMIN_OFFER_CREATE = gql`
mutation createOffer($input: OfferPayload!) {
    createOffer(input: $input) {
                    id
                    name
        }
}`;

export const ADMIN_OFFER_DELETE = gql`
    mutation deleteOffer($id: ID!) {
       deleteOffer(id: $id){
            id
        }
    }
`;


export const ADMIN_OFFER_UPDATE = gql`
mutation UpdateOffer($id: ID!, $input: OfferUpdatePayload!) {
    updateOffer(id: $id, input: $input) {
                        id
                         name
        }
}`;
