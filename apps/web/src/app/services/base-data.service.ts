import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BaseDataService {

    private readonly _data = {
        'antiques': new Array(1000).fill({}).map((item, index) => ModelGenerator.createAntique(index + 1)),
        'events': new Array(1000).fill({}).map((item, index) => ModelGenerator.createEvent(index + 1))
    }

    private readonly _pageSize: number = 30
    get<T extends AntiqueModel | EventModel>(collection: 'antiques' | 'events' = 'antiques', page: number = 1, pageSize: number | null = null): Promise<T[]> {
        return new Promise((resolve, reject) => {
            if (pageSize == null || pageSize <= 0) pageSize ??= this._pageSize
            resolve(this._data[collection].slice((page - 1) * pageSize, page * pageSize));
        })
    }

    find<T extends AntiqueModel | EventModel>(collection: 'antiques' | 'events' = 'antiques', slug: string): Promise<T> {
        return new Promise((resolve, reject) => {
            resolve(this._data[collection].find(x => x.slug === slug))
        })
    }



}

class ModelGenerator {
    static createAntique(id: number): any {
        const index = id - 1
        const name = names[index % names.length]
        const shortDesc = dates[index % dates.length]

        return {
            id,
            name: name, slug: name.toLowerCase().replace(/\s/g, '-') + id,
            shortDesc,
            description: id % 2 === 0 ? 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...' : 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',
            price: prices[index % prices.length],
            image: photos[index % photos.length],
            category: 'Antiques',
            tags: ['Victorian', 'Century', 'Antique'],
            images: itemImages
        }
    }
    static createEvent(id: number): any {
        const index = id - 1
        const name = names[index % names.length]
        return {
            id,
            name,
            slug: name.toLowerCase().replace(/\s/g, '-') + id,
            description: `Event ${id} description`,
            price: Math.floor(Math.random() * 100),
            image: `https://picsum.photos/id/${id}/200/300`
        }
    }
}
const names = ['RENE LALIQUE FIGURINES ET VOILES BOX', 'SET OF THREE ANTIQUE VICTORIAN JUGS', '19TH CENTURY MAHOGANY CASED BRACKET CLOCK WITH', 'ANTIQUE EMPIRE REVIVAL BUREAU PLAT DESK WRITING', 'STUNNING PAIR OF ANTIQUE VICTORIAN OAK CASTLE', 'GEORGE III CROSSBANDED CHEST OF DRAWERS. CIRCA', 'ANTIQUE QUALITY CARVED OAK BANJO BAROMETER', 'UNIQUE ONE OFF CEILING LIGHT FITTING', 'EDWARDIAN TURQUOISE 5 STONE RING', 'EDWARDIAN BRASS TWISTED CORINTHIAN COLUMN TABLE LAMP', 'VICTORIAN 18CT CUSHION CUT DIAMOND SOLITAIRE RING', 'EDWARDIAN FAMILY BOOK LOCKET WITH SIX PHOTOS', 'GEORGE III MAHOGANY DRESSING TABLE MIRROR', 'VICTORIAN TURQUOISE & DIAMOND SWIRL RING', 'ANTIQUE TURQUOISE BOMBÉ RING', 'CARVED OAK PLANTER', 'THE VINTAGE BRILLIANT AND EIGHT CUT DIAMOND', 'ANTIQUE VICTORIAN TERRESTRIAL LIBRARY TABLE GLOBE BY', 'EDWARDIAN BRASS CORINTHIAN COLUMN TABLE LAMP', 'VICTORIAN LARGE HEART PENDANT', 'CAST IRON BENCH WITH LION HEAD ARM', 'ANTIQUE SYRIAN DAMASCUS INLAID CARD, CHESS, BACKGAMMON,', 'VICTORIAN GOLD ROSE CUT DIAMOND, RUBY, PEARL', 'MARQUETRY INLAID JEWELLERY BOX DRESSING TABLE C.1890', 'OAK DRESSER BASE C.1780', 'TALL SPELTER FIGURES OF DON JUAN &', 'THE VINTAGE BRILLIANT AND SINGLE CUT DIAMOND', 'REGENCY MAHOGANY BOW FRONT CHEST OF DRAWERS', 'MAHOGANY DISPLAY EASEL C.1900', 'NOVELTY ITALIAN PINEAPPLE ICE BUCKET BY MAURO', '9CT GOLD CLASP 16" PEARL NECKLACE', 'SET OF 8 VICTORIAN ROSEWOOD CABRIOLE LEG', '19TH CENTURY ANTIQUE VICTORIAN SET OF FOUR', 'SMALL GEORGE III MAHOGANY CHEST ON CHEST', 'GEORGIAN MAHOGANY BOW FRONT CHEST OF DRAWERS', 'GEORGIAN ROSE CUT DIAMOND CLUSTER RING, CIRCA', '2.38CT DIAMOND AND PLATINUM SOLITAIRE RING -', '16TH CENTURY CARVED OAK ESCUTCHEON', 'FRENCH LOUIS XVI KIDNEY LAMP TABLE', 'ANTIQUE BURR WALNUT SERPENTINE SHAPED DRESSING TABLE', 'FABULOUS QUALITY LARGE GERMAN SOLID SILVER SHAKER', 'GEORGE III SMALL MAHOGANY  BOW FRONT', 'GEORGIAN MAHOGANY SIDE TABLE - FREE DELIVERY', 'A LOVELY BURR WALNUT SIDE CABINET WITH', 'A LOVELY FRENCH KINGWOOD BONHEUR DU JOUR', 'A BEAUTIFUL SATINWOOD CABINET WITH PORCELAIN PLAQUES', 'SILVER 1930S ART DECO SILVANA POCKET WATCH', 'THE ANTIQUE 1915 22CT GOLD WEDDING RING']
const dates = ['DATED 1920', 'DATED 1880', 'DATED 19TH CENTURY', 'DATED 19TH CENTURY', 'LAPADA', 'CINOA', 'DATED VICTORIAN', 'DATED 18TH CENTURY', 'BADA', 'DATED 1880', 'DATED 1910', 'DATED EDWARDIAN', 'DATED EDWARDIAN', 'DATED VICTORIAN', 'DATED EDWARDIAN', 'DATED 1800', 'DATED VICTORIAN', 'DATED 1930', 'DATED 1890', 'DATED 1930', 'DATED 19TH CENTURY', 'LAPADA', 'CINOA', 'DATED EDWARDIAN', 'DATED VICTORIAN', 'DATED VICTORIAN', 'DATED 1910', 'LAPADA', 'CINOA', 'DATED VICTORIAN', 'LAPADA', 'CINOA', 'DATED 1890', 'DATED 18TH CENTURY', 'DATED 1890', 'DATED 1950', 'DATED REGENCY', 'DATED 1900', 'DATED 1960', 'DATED 1950', 'DATED VICTORIAN', 'DATED VICTORIAN', 'LAPADA', 'CINOA', 'DATED GEORGIAN', 'DATED GEORGIAN', 'DATED 1800', 'DATED 1930', 'LAPADA', 'CINOA', 'DATED 16TH CENTURY', 'DATED 1920', 'DATED 1920', 'DATED 1920', 'DATED GEORGIAN', 'DATED GEORGIAN', 'DATED 19TH CENTURY', 'DATED 19TH CENTURY', 'DATED 19TH CENTURY', 'DATED 1930', 'DATED 1910']
const prices = ['£1,395', '£165', '£1,650', '£5,950', '£15,000', '£3,450', '£495', '£440', '£365', '£495', '£450', '£695', '£380', '£265', '£350', '£495', '£519', '£4,650', '£480', '£285', '£295', '£2,850', '£1,895', '£495', '£1,495', '£1,495', '£489', '£475', '£495', '£795', '£250', '£465', '£10,350', '£750', '£595', '£850', '£22,950', '£450', '£695', '£625', '£235', '£495', '£430', '£1,950', '£3,250', '£3,600', '£165', '£659']
const photos = [
    "https://www.sellingantiques.co.uk/photosnew/dealer_bradleygent/dealer_bradleygent_large_1659365185758-3301347539.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_uniqueantiquesbyemmajade/dealer_uniqueantiquesbyemmajade_large_1659365186188-6693687999.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_quietstreetbath/dealer_quietstreetbath_large_1659366016914-0274713527.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_regentantiques/dealer_regentantiques_large_1659363721012-7296950126.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_royalhouseantiques/dealer_royalhouseantiques_large_1659364467289-1541844935.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_guydennler/dealer_guydennler_large_1659364843758-7508968552.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_uniqueantiquesbyemmajade/dealer_uniqueantiquesbyemmajade_large_1659364978738-4236442769.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_swansofoakham/dealer_swansofoakham_large_1659364920875-0961986225.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_evaantiques/dealer_evaantiques_large_1659364146438-9724114268.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_churchstreet/dealer_churchstreet_large_1659364125066-5909218293.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_evaantiques/dealer_evaantiques_large_1659364222348-1840377343.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_evaantiques/dealer_evaantiques_large_1659363948859-3899161799.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_churchstreet/dealer_churchstreet_large_1659363869324-1558606337.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_evaantiques/dealer_evaantiques_large_1659364024977-7438251040.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_evaantiques/dealer_evaantiques_large_1659364088258-2457341562.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_collinge/dealer_collinge_large_1659363514047-7982260675.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_antiquejewellers/dealer_antiquejewellers_large_1659363572555-0209504777.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_regentantiques/dealer_regentantiques_large_1659363190918-4616631250.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_churchstreet/dealer_churchstreet_large_1659363641531-7673084727.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_evaantiques/dealer_evaantiques_large_1659363879250-2777605471.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_swansofoakham/dealer_swansofoakham_large_1659363839375-3662535793.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_regentantiques/dealer_regentantiques_large_1659362781707-0191159341.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_howell1870/dealer_howell1870_large_1659362977547-4619918013.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_collinge/dealer_collinge_large_1659363062230-4153360333.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_collinge/dealer_collinge_large_1659363242734-3700875537.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_collinge/dealer_collinge_large_1659363360969-0085939383.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_antiquejewellers/dealer_antiquejewellers_large_1659363008359-5315255965.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_rogerking/dealer_rogerking_large_1659362526469-0725701545.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_collinge/dealer_collinge_large_1659362921031-1296911973.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_puckerings/dealer_puckerings_large_1659361640418-5251048998.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_silversalvo/dealer_silversalvo_large_1659361813230-9184801055.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_rogerking/dealer_rogerking_large_1659361628922-1015060752.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_paulbennett/dealer_paulbennett_large_1659361920238-0766740101.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_rogerking/dealer_rogerking_large_1659361915949-8701590586.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_Rawlingsantiques/dealer_Rawlingsantiques_large_1659362255305-7368074617.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_gatsby/dealer_gatsby_large_1659362535938-0679225229.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_acsilver/dealer_acsilver_large_1659360053066-9432345907.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_Elmgarden/dealer_Elmgarden_large_1659360381383-0087819478.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_sussex/dealer_sussex_large_1659360608117-4560257205.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_Castleforge/dealer_Castleforge_large_1659360875395-3677783609.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_theartofquality/dealer_theartofquality_large_1659358917898-3974535197.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_rogerking/dealer_rogerking_large_1659361429199-5428823853.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_number6antiques/dealer_number6antiques_large_1659359128062-9323403461.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_hawkinsbrothersantiques/dealer_hawkinsbrothersantiques_large_1659359211402-5411052441.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_hawkinsbrothersantiques/dealer_hawkinsbrothersantiques_large_1659359335012-9820002646.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_hawkinsbrothersantiques/dealer_hawkinsbrothersantiques_large_1659359399188-3945157809.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_vintagewristwatch/dealer_vintagewristwatch_large_1659359500055-8171633283.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_antiquejewellers/dealer_antiquejewellers_large_1659360030613-4464471866.jpg",
]

const itemImages = [
    "https://www.sellingantiques.co.uk/photosnew/dealer_frankcraig/dealer_frankcraig_highres_1659365263617-6192906623.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_frankcraig/dealer_frankcraig_highres_1659365269047-6518311866.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_frankcraig/dealer_frankcraig_highres_1659365273129-5966847875.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_frankcraig/dealer_frankcraig_highres_1659365276383-8111077375.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_frankcraig/dealer_frankcraig_highres_1659365278207-5568324466.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_frankcraig/dealer_frankcraig_highres_1659365279992-1111767869.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_frankcraig/dealer_frankcraig_highres_1659365284281-5592100026.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_frankcraig/dealer_frankcraig_highres_1659365285426-5814986129.jpg",
    "https://www.sellingantiques.co.uk/photosnew/dealer_frankcraig/dealer_frankcraig_highres_1659365288441-6173476865.jpg"
]

class BaseModel {
    id = 0;
    name = '';
    slug = '';
    shortDesc = '';
    description = '';
    price = 0;
    image = '';
    category = '';
    tags: string[] = [];
    date: Date = new Date();
}

export class AntiqueModel extends BaseModel {
    images: string[] = []
}

export class EventModel extends BaseModel {
}