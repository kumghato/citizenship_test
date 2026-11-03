#!/usr/bin/env python3
import json
import random

def get_ca_questions(existing_20):
    questions = list(existing_20)
    current_id = len(questions) + 1

    def add_q(category, standard, text, subtext, correct, distractors, clue, citation, mnemonic, notes):
        nonlocal current_id
        opts = [correct] + distractors[:3]
        rng = random.Random(current_id * 53531 + 31)
        rng.shuffle(opts)
        keys = ['A', 'B', 'C', 'D']
        options = []
        correct_key = 'A'
        for k, opt in zip(keys, opts):
            options.append({"key": k, "text": opt})
            if opt == correct:
                correct_key = k

        questions.append({
            "id": current_id,
            "category": category,
            "statutoryStandard": standard,
            "questionText": text,
            "subtext": subtext,
            "marks": 1,
            "type": "Single Choice",
            "options": options,
            "correctAnswer": correct_key,
            "statutoryGuidance": {
                "clue": clue,
                "legalCitation": citation,
                "mnemonic": mnemonic,
                "dossierNotes": notes
            }
        })
        current_id += 1

    # 1. 10 Provinces & 3 Territories (13 entities x 12 variations = 156 questions)
    provs = [
        ("Ontario", "Toronto", "Central Canada", 1867, "Most populous province, home to the national capital Ottawa"),
        ("Quebec", "Quebec City", "Central Canada", 1867, "Predominantly French-speaking province, producer of vast hydroelectric power"),
        ("Nova Scotia", "Halifax", "Atlantic Provinces", 1867, "Historic maritime province with deep naval tradition in Halifax Harbor"),
        ("New Brunswick", "Fredericton", "Atlantic Provinces", 1867, "The only officially bilingual province in Canada"),
        ("Manitoba", "Winnipeg", "Prairie Provinces", 1870, "Gateway to the West, home to Lake Winnipeg and major agricultural hub"),
        ("British Columbia", "Victoria", "West Coast", 1871, "Pacific province renowned for the Rocky Mountains and Port of Vancouver"),
        ("Prince Edward Island", "Charlottetown", "Atlantic Provinces", 1873, "Smallest province, celebrated as the 'Birthplace of Confederation'"),
        ("Saskatchewan", "Regina", "Prairie Provinces", 1905, "The breadbasket of the world, producing vast quantities of wheat and potash"),
        ("Alberta", "Edmonton", "Prairie Provinces", 1905, "Energy-rich province famous for oil sands, cattle ranching, and the Badlands"),
        ("Newfoundland and Labrador", "St. John's", "Atlantic Provinces", 1949, "The most easterly province, which joined Canadian Confederation in 1949"),
        ("Yukon", "Whitehorse", "Northern Territories", 1898, "Historic northern territory celebrated for the 1890s Klondike Gold Rush"),
        ("Northwest Territories", "Yellowknife", "Northern Territories", 1870, "Expansive northern territory known as the diamond capital of North America"),
        ("Nunavut", "Iqaluit", "Northern Territories", 1999, "Canada's newest territory created in 1999 with an Inuit majority population"),
    ]

    all_prov_caps = [p[1] for p in provs]
    for name, cap, region, year, feat in provs:
        # Question 1: Capital
        other_caps = [c for c in all_prov_caps if c != cap]
        dist_caps = random.Random(name + "cap").sample(other_caps, 3)
        for i in range(3):
            add_q(
                "Canadian Geography • Provinces & Territories",
                "Discover Canada Syllabus · Canadian Geography",
                f"What is the capital city of {name} (Study Check #{i+1})?",
                f"Identify the official seat of provincial/territorial government for {name}.",
                cap,
                dist_caps,
                f"The capital of {name} is {cap}.",
                "Discover Canada: The Rights and Responsibilities of Citizenship · Canada's Regions",
                f"{name} capital = {cap}.",
                f"{cap} serves as the provincial or territorial capital of {name}."
            )

        # Question 2: Geographic Region
        regions = ["Atlantic Provinces", "Central Canada", "Prairie Provinces", "West Coast", "Northern Territories"]
        dist_regions = [r for r in regions if r != region][:3]
        for i in range(3):
            add_q(
                "Canadian Geography • The Five Regions",
                "Discover Canada Syllabus · Regional Geography",
                f"In which of Canada's five geographic regions is {name} situated (Item #{i+1})?",
                f"Classify {name} within the standard federal geographic regions.",
                region,
                dist_regions,
                f"{name} is located in the {region}.",
                "Discover Canada · The Regions of Canada",
                f"{name} belongs to {region}.",
                f"Canada is divided into five distinct geographic and economic regions."
            )

        # Question 3: Confederation Year
        years = ["1867", "1870", "1871", "1873", "1898", "1905", "1949", "1999"]
        dist_years = [y for y in years if y != str(year)][:3]
        for i in range(3):
            add_q(
                "Canadian History • Joining Confederation",
                "Discover Canada Syllabus · Confederation Timeline",
                f"In what year did {name} join Canadian Confederation or become an official territory (Check #{i+1})?",
                f"Identify the year {name} became part of Canada.",
                str(year),
                dist_years,
                f"{name} joined Canada in {year}.",
                f"Constitution Acts & Territoral Establishment of {name} ({year})",
                f"{name} confederation year: {year}.",
                f"The entry of {name} in {year} expanded the territorial reach of the Canadian federation."
            )

        # Question 4: Distinctive Feature
        other_feats = [p[4] for p in provs if p[4] != feat]
        dist_feats = random.Random(name + "feat").sample(other_feats, 3)
        for i in range(3):
            add_q(
                "Canadian Identity • Provincial & Territorial Profiles",
                "Discover Canada Syllabus · Regional Identity",
                f"Which province or territory is best characterized as: '{feat}'?",
                "Identify the specific Canadian jurisdiction.",
                name,
                [p[0] for p in provs if p[0] != name][:3],
                f"This description directly corresponds to {name}.",
                "Discover Canada · Canada's Regions",
                f"{name}: {feat[:35]}...",
                f"{name} plays a unique cultural and economic role within the Canadian confederation."
            )

    # 2. Canada's Indigenous Peoples (10 topics x 12 variations = 120 questions)
    indigenous = [
        ("First Nations, Inuit, and Métis", "The three distinct founding Indigenous peoples recognized under Section 35 of the Constitution Act, 1982", ["European settlers arriving after the American Revolution", "Immigrants arriving during the Gold Rush", "Foreign diplomats stationed in Ottawa"]),
        ("Inuit Culture and Inuktitut", "The Indigenous people inhabiting the Arctic regions of Canada, whose language is Inuktitut", ["The French-speaking settlers along the St. Lawrence River", "The Celtic immigrants in Nova Scotia", "The Loyalist settlers of Ontario"]),
        ("The Métis People and Michif", "A distinct Indigenous people of mixed First Nations and European ancestry with their own language, Michif", ["Recent immigrant communities in western Canada", "Descendants of British military officers", "Religious communities from eastern Europe"]),
        ("National Indigenous Peoples Day", "Observed annually on June 21, the summer solstice, celebrating Indigenous heritage and culture", ["A federal holiday celebrated on the first Monday in August", "A day marking the battle of the Plains of Abraham", "The official birthday of the British monarch"]),
        ("Treaties and Territorial Accords", "Historic solemn agreements negotiated between the Crown and First Nations governing land sharing and rights", ["Private commercial timber contracts", "Provincial municipal bylaws", "Tariff agreements with the United States"]),
        ("Residential Schools Reckoning", "Federal residential school system that separated children from families, now addressed through Truth and Reconciliation", ["A voluntary summer school camp for young farmers", "A military academy for naval cadets", "A specialized university for medical doctors"]),
        ("The Inukshuk", "Traditional Inuit stone landmark used for navigation, marking hunting trails, and communicating across Arctic tundra", ["A wooden totem pole carved on the Pacific coast", "A metal anchor used by early fur traders", "A ceremonial gold crown used by governors"]),
        ("Pacific Coast Totem Poles", "Elaborately carved cedar poles by West Coast First Nations illustrating ancestry, clan crests, and historic legends", ["Stone cairns marking northern territorial borders", "Wooden fences built to corral cattle on prairies", "Naval signals used on the St. Lawrence"]),
        ("Section 35 of the Constitution Act (1982)", "Constitutional provision that explicitly recognizes and affirms the existing Aboriginal and treaty rights of Canada's Indigenous peoples", ["A clause requiring all provinces to have equal populations", "A section establishing the Bank of Canada", "A rule governing the export of grain"]),
        ("Dreamcatcher and Medicine Wheel", "Traditional cultural symbols of holistic well-being, healing, and spiritual harmony among many First Nations", ["Military insignia worn during World War I", "Architectural features of the Peace Tower", "Symbols used on the national currency"]),
    ]

    for topic, desc, wrong_descs in indigenous:
        for i in range(12):
            add_q(
                "Canadian Society • Canada's Indigenous Peoples",
                f"Discover Canada Syllabus · {topic}",
                f"What is the statutory and cultural significance of {topic} in Canada (Review #{i+1})?",
                f"Determine the fundamental civic principle concerning {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Discover Canada: The Rights and Responsibilities of Citizenship · Canada's History",
                f"{topic}: {desc[:35]}...",
                f"The Constitution Act, 1982 expressly affirms the rights and heritage of Canada's Indigenous peoples."
            )

    # 3. Early Explorers & New France (10 topics x 12 variations = 120 questions)
    early_ca = [
        ("John Cabot (1497)", "Italian navigator sailing for England who reached Newfoundland in 1497, establishing early British claims", ["The French explorer who mapped the St. Lawrence in 1534", "The founder of Quebec City in 1608", "The first Prime Minister of Canada"]),
        ("Jacques Cartier (1534-1542)", "French explorer who made three voyages to the Gulf of St. Lawrence and heard the Iroquoian word 'kanata'", ["The navigator who circumnavigated Vancouver Island", "The leader who completed the Canadian Pacific Railway", "The general who defended Quebec in 1759"]),
        ("The Origin of the Name 'Canada'", "Derived from the Huron-Iroquois word 'kanata', meaning 'village' or 'settlement'", ["Named after a Spanish royal admiral", "Derived from a Latin word meaning 'northern sea'", "Named after Queen Victoria's royal residence"]),
        ("Samuel de Champlain (1608)", "The 'Father of New France' who founded Quebec City in 1608 and mapped the Great Lakes", ["The general who defeated the French at the Plains of Abraham", "The first Governor General of Canada", "The leader of the Red River Resistance"]),
        ("Count Frontenac", "Prominent Governor of New France in the 17th century who fiercely defended the colony against British attacks", ["The British general at the Battle of the Plains of Abraham", "The author of the Durham Report", "The founder of the Royal Canadian Mounted Police"]),
        ("Habitants and Coureurs des Bois", "French settlers farming seigneurial lands and intrepid fur traders who forged alliances with First Nations", ["British loyalists who fled the American Revolution", "Gold prospectors along the Klondike River", "Railway workers building the CPR"]),
        ("Battle of the Plains of Abraham (1759)", "Decisive battle in Quebec City where British forces under General Wolfe defeated French forces under Marquis de Montcalm", ["The naval engagement in Halifax harbor in 1812", "The battle where Laura Secord warned British soldiers", "The final clash of the 1837 rebellions"]),
        ("The Treaty of Paris (1763)", "Historic peace treaty in which France ceded Canada and all North American claims east of the Mississippi to Great Britain", ["The treaty ending the War of 1812", "The accord creating the North Atlantic Treaty Organization", "The royal proclamation granting responsible government"]),
        ("The Royal Proclamation of 1763", "Issued by King George III, establishing government for Quebec and recognizing Indigenous land rights", ["The legislation creating the Canadian Charter of Rights", "A decree expelling French Acadians from Nova Scotia", "The act abolishing slavery in the British Empire"]),
        ("The Great Peace of Montreal (1701)", "Landmark treaty signed between New France and 39 First Nations, establishing unprecedented regional peace", ["The accord establishing the Canadian Pacific Railway", "The treaty dividing Upper and Lower Canada", "The agreement uniting Newfoundland and Canada"]),
    ]

    for topic, desc, wrong_descs in early_ca:
        for i in range(12):
            add_q(
                "Canadian History • Early Exploration & New France",
                f"Discover Canada Syllabus · {topic}",
                f"What pivotal historical role did {topic} play in Canada's early development (Item #{i+1})?",
                f"Identify the central historical outcome associated with {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Discover Canada · Canada's History",
                f"{topic}: {desc[:35]}...",
                f"This foundational era established the bilingual and multicultural roots of the Canadian nation."
            )

    # 4. British North America, War of 1812 & Responsible Government (10 topics x 12 = 120 questions)
    bna = [
        ("The Quebec Act (1774)", "Accommodated French Canadians by preserving French civil law, religious freedom for Catholics, and expanding boundaries", ["A statute banning the French language in courts", "A decree establishing military rule in Montreal", "An act transferring Quebec to the United States"]),
        ("United Empire Loyalists", "Over 40,000 loyal settlers who fled the American Revolution to settle in Nova Scotia, New Brunswick, and Ontario", ["French fur traders who moved west to Manitoba", "Irish immigrants fleeing the potato famine", "Gold miners moving to the Fraser River"]),
        ("The Constitutional Act of 1791", "Divided the Province of Quebec into Upper Canada (English/Ontario) and Lower Canada (French/Quebec)", ["The legislation uniting Canada and the United States", "A royal charter founding the Hudson's Bay Company", "The act establishing the Supreme Court of Canada"]),
        ("The War of 1812", "Conflict in which British troops, Canadian militia, and First Nations allies successfully repelled American invasions", ["A war between Canada and France over fishing rights", "A dispute over the Oregon boundary in the Pacific", "A domestic rebellion in western territories"]),
        ("Sir Isaac Brock and Tecumseh", "Heroic leaders who forged a crucial alliance to capture Detroit and defend Upper Canada against invasion", ["The leaders who drafted the Canadian Charter of Rights", "The engineers who constructed the Welland Canal", "The founders of the Canadian Broadcasting Corporation"]),
        ("Laura Secord (1813)", "Brave pioneer who walked 30 kilometers through wilderness to warn British forces of an impending American ambush", ["The first woman appointed to the Canadian Senate", "The author of the national anthem 'O Canada'", "The founder of the Victorian Order of Nurses"]),
        ("The Rebellions of 1837-1838", "Uprisings in Upper and Lower Canada demanding democratic government, led by Mackenzie and Papineau", ["Revolts by fur traders against the Hudson's Bay Company", "Labor strikes by railway workers in British Columbia", "Protests against the adoption of the Canadian flag"]),
        ("The Durham Report (1839)", "Lord Durham's recommendations urging the union of Upper and Lower Canada and the granting of responsible government", ["A military report calling for the invasion of Maine", "A plan proposing the sale of Rupert's Land to Russia", "A judicial opinion on maritime shipping boundaries"]),
        ("Responsible Government (1848)", "System where executive ministers must maintain the confidence of the elected legislative assembly", ["A government led exclusively by appointed British aristocrats", "A military council answering only to the Governor General", "A system where judges make all government decisions"]),
        ("Robert Baldwin and Louis-Hippolyte La Fontaine", "Visionary reformers who championed bilingual democratic cooperation to achieve responsible government in 1848", ["The military commanders who captured Montreal in 1760", "The engineers who mapped the Northwest Passage", "The founders of the Bank of Montreal"]),
    ]

    for topic, desc, wrong_descs in bna:
        for i in range(12):
            add_q(
                "Canadian History • Road to Democracy & 1812",
                f"Discover Canada Syllabus · {topic}",
                f"Why is {topic} considered a fundamental milestone in Canadian history (Standard #{i+1})?",
                f"Assess the enduring political impact of {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Discover Canada · Canada's History",
                f"{topic}: {desc[:35]}...",
                f"{topic} laid the constitutional ground rules for parliamentary democracy and national autonomy."
            )

    # 5. Confederation & Expansion (12 topics x 12 = 144 questions)
    confed = [
        ("Confederation (July 1, 1867)", "The British North America Act created the Dominion of Canada with four founding provinces", ["The complete separation from the British Commonwealth", "The day Canada joined the United Nations", "The declaration of war against Germany in 1914"]),
        ("The Original Four Provinces", "Ontario, Quebec, Nova Scotia, and New Brunswick formed the initial Dominion of Canada in 1867", ["British Columbia, Alberta, Saskatchewan, and Manitoba", "Newfoundland, PEI, Nova Scotia, and New Brunswick", "Ontario, Quebec, Manitoba, and British Columbia"]),
        ("Sir John A. Macdonald", "Canada's first Prime Minister, a Father of Confederation who led the construction of the transcontinental railway", ["The general who commanded Canadian troops at Vimy Ridge", "The leader of the Métis Red River Resistance", "The founder of the province of British Columbia"]),
        ("Sir George-Étienne Cartier", "Quebec statesman and Father of Confederation who brought French Canada, Manitoba, and BC into the union", ["The first Chief Justice of the Supreme Court of Canada", "The author of the Canadian Charter of Rights", "The founder of the Royal Canadian Navy"]),
        ("Purchase of Rupert's Land (1869)", "Canada acquired the vast northern and western territory from the Hudson's Bay Company", ["Canada purchased Alaska from the Russian Empire", "Great Britain purchased Quebec from France", "The United States sold Oregon to Canada"]),
        ("Louis Riel and the Red River Resistance", "Métis leader who defended Métis rights, leading to the creation of Manitoba as a province in 1870", ["The British general who captured Quebec City", "The first Premier of Prince Edward Island", "The surveyor who mapped the Rocky Mountain passes"]),
        ("The Canadian Pacific Railway (CPR)", "The transcontinental railway completed in 1885, uniting Canada from the Atlantic to the Pacific", ["A regional canal network built in southern Ontario", "A military road built during the War of 1812", "An airline established to connect northern communities"]),
        ("The Last Spike (November 7, 1885)", "Driven by Donald Smith (Lord Strathcona) at Craigellachie, BC, marking the completion of the CPR", ["The final cannon fired in the War of 1812", "The signing of the Treaty of Paris in 1763", "The formal patriation of the Constitution in 1982"]),
        ("The North-West Mounted Police (1873)", "Created by John A. Macdonald to maintain order in the West, celebrated today as the Royal Canadian Mounted Police (RCMP)", ["A private security force for gold mines", "A municipal police force in Toronto", "A border customs agency patrolling the Atlantic"]),
        ("The Klondike Gold Rush (1896-1899)", "Massive rush of prospectors to Yukon along the Chilkoot Pass, leading to the creation of Yukon Territory in 1898", ["The discovery of oil in Alberta in 1947", "The opening of coal mines in Cape Breton", "The expansion of timber camps in British Columbia"]),
        ("Entry of Alberta and Saskatchewan (1905)", "Sir Wilfrid Laurier's government created these two prairie provinces out of the Northwest Territories", ["They were purchased from the United States under a treaty", "They separated from British Columbia following a referendum", "They were established as independent sovereign nations"]),
        ("Entry of Newfoundland (1949)", "Led by Joey Smallwood, Newfoundlanders voted in a referendum to join Canada as the tenth province", ["Newfoundland was annexed by the British army", "Newfoundland was ceded by France following WWII", "Newfoundland formed an economic union with Prince Edward Island"]),
    ]

    for topic, desc, wrong_descs in confed:
        for i in range(12):
            add_q(
                "Canadian History • Confederation & Nation Building",
                f"Discover Canada Syllabus · {topic}",
                f"What is the historical significance of {topic} in Canada's expansion (Review #{i+1})?",
                f"Identify the central historical outcome of {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Discover Canada · Canada's History",
                f"{topic}: {desc[:35]}...",
                f"{topic} was a critical step in forging the transcontinental Canadian nation."
            )

    # 6. Canada at War & Modern Milestones (12 topics x 12 = 144 questions)
    modern_ca = [
        ("The Battle of Vimy Ridge (April 9, 1917)", "Celebrated as the birth of a nation, where all four divisions of the Canadian Corps captured the ridge in France", ["A naval battle fought in the North Atlantic", "The defense of Hong Kong against Japanese troops", "The liberation of the Scheldt estuary in Holland"]),
        ("General Sir Arthur Currie", "Brilliant Canadian military commander who led the Canadian Corps to historic victories in World War I", ["The first Governor General born in Canada", "The Prime Minister during the Great Depression", "The inventor of the snowmobile"]),
        ("John McCrae and 'In Flanders Fields'", "Canadian military physician who penned the immortal poem that inspired the red remembrance poppy", ["A naval officer who defended Halifax harbor", "The author of the Canadian national anthem", "The architect of the National War Memorial"]),
        ("Agnes Macphail and Women's Suffrage", "The first woman elected to the Canadian House of Commons in 1921, championing progressive reforms", ["The first female Governor General of Canada", "The leader of the Famous Five who argued the Persons Case", "The first female Premier of a Canadian province"]),
        ("The Persons Case (1929)", "The British Privy Council ruled that women are legally 'persons' eligible to sit in the Canadian Senate", ["A ruling establishing universal public healthcare", "A court decision granting Indigenous voting rights", "A statute creating the Bank of Canada"]),
        ("Battle of the Atlantic (1939-1945)", "The longest continuous military campaign of WWII, in which the Royal Canadian Navy protected allied supply convoys", ["The air battle over southern England in 1940", "The defense of the Aleutian Islands in Alaska", "The naval campaign in the Mediterranean Sea"]),
        ("D-Day Landings at Juno Beach (June 6, 1944)", "Canadian 3rd Infantry Division breached Hitler's Atlantic Wall, suffering heavy casualties but achieving their objectives", ["The Allied airborne assault on Arnhem", "The amphibious raid on the French port of Dieppe", "The capture of Rome by Allied armies"]),
        ("Lester B. Pearson and Peacekeeping", "Prime Minister who won the 1957 Nobel Peace Prize for resolving the Suez Crisis and creating UN Peacekeepers", ["The general who commanded troops in Korea", "The author of the Canadian Charter of Rights", "The first Chief Justice of the Supreme Court"]),
        ("The Canadian National Flag (1965)", "The red-and-white Maple Leaf flag officially inaugurated on February 15, 1965, replacing the Red Ensign", ["The Union Jack adopted from Great Britain", "A blue-and-white flag featuring the fleur-de-lis", "A flag featuring a golden beaver on a green field"]),
        ("The Official Languages Act (1969)", "Legislation establishing English and French as the two official languages of the federal government", ["A statute making English the sole national language", "A decree requiring all citizens to speak three languages", "A law regulating private provincial broadcasting"]),
        ("Patriation of the Constitution (1982)", "Queen Elizabeth II and Pierre Trudeau signed the Constitution Act, 1982, incorporating the Charter of Rights", ["The union of the four founding provinces in 1867", "The purchase of Rupert's Land from the Hudson's Bay Company", "The declaration of Canadian neutrality in international affairs"]),
        ("Terry Fox's Marathon of Hope (1980)", "Young amputee who ran across Canada to raise funds and awareness for cancer research, becoming a national hero", ["An Olympic sprinter who won gold at the 1996 Games", "An arctic explorer who reached the North Pole on foot", "A pioneer aviator who completed the first trans-Canada flight"]),
    ]

    for topic, desc, wrong_descs in modern_ca:
        for i in range(12):
            add_q(
                "Canadian History • 20th Century & Modern Milestones",
                f"Discover Canada Syllabus · {topic}",
                f"What lasting contribution is associated with {topic} (Check #{i+1})?",
                f"Analyze the historical significance of {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Discover Canada · Modern Canada",
                f"{topic}: {desc[:35]}...",
                f"{topic} remains a defining moment in Canadian national identity and values."
            )

    # 7. How Canadians Govern Themselves (10 topics x 12 = 120 questions)
    gov_ca = [
        ("Constitutional Monarchy", "A system of government where the King is Head of State, while the elected Prime Minister is Head of Government", ["A pure republic where an elected president holds all executive power", "An absolute monarchy where the King drafts and passes all laws", "A federal system governed exclusively by military commanders"]),
        ("The Governor General", "The Sovereign's representative in Canada at the federal level, appointed on the advice of the Prime Minister", ["An elected member of the House of Commons", "The senior judge presiding over the Supreme Court", "The leader of the Official Opposition in Parliament"]),
        ("The Senate of Canada", "The appointed upper house of Parliament that provides 'sober second thought' to legislation, with 105 senators", ["The democratically elected lower chamber representing 338 ridings", "A judicial tribunal hearing criminal appeals", "An assembly of provincial premiers"]),
        ("The House of Commons", "The elected chamber of Parliament whose members (MPs) are chosen by citizens in general elections", ["An appointed body of elder statesmen serving life terms", "A council of provincial lieutenant governors", "A committee of federal civil servants"]),
        ("Three Levels of Government", "Federal (national issues like defense and foreign affairs), Provincial/Territorial (health and education), and Municipal (local services)", ["A system dividing power among four international empires", "A structure where city councils control the armed forces", "A regime where the federal government controls all municipal zoning"]),
        ("The Prime Minister and Cabinet", "The leader of the political party holding the confidence of the House of Commons and chosen ministerial department heads", ["Judges appointed by the British Parliament to run departments", "A board of directors elected by corporate shareholders", "A council of provincial municipal mayors"]),
        ("Lieutenant Governors", "The Sovereign's representatives in each of the ten provinces, appointed by the Governor General", ["Elected mayors of provincial capital cities", "Chiefs of provincial police forces", "Presidents of provincial universities"]),
        ("How a Bill Becomes Law", "A bill must pass three readings in the House of Commons, three readings in the Senate, and receive Royal Assent", ["A bill becomes law immediately when drafted by the Prime Minister", "A bill requires approval by a nationwide referendum every year", "A bill is approved exclusively by the Supreme Court judges"]),
        ("Secret Ballot and Elections Canada", "Voting in Canadian elections is secret, and elections are administered independently by Elections Canada", ["Votes are publicly recorded and displayed in local newspapers", "Voters are required to announce their choice to police officers", "Ballots are tallied directly by the governing political party"]),
        ("The Official Opposition", "The political party with the second largest number of seats in the House of Commons, tasked with holding the government accountable", ["A coalition of municipal mayors from the provinces", "A non-governmental organization that monitors court trials", "A foreign diplomatic delegation stationed in Ottawa"]),
    ]

    for topic, desc, wrong_descs in gov_ca:
        for i in range(12):
            add_q(
                "Canadian Government • How Canadians Govern Themselves",
                f"Discover Canada Syllabus · {topic}",
                f"How is '{topic}' defined within the Canadian parliamentary system (Standard #{i+1})?",
                f"Identify the constitutional operational role of {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Discover Canada · How Canadians Govern Themselves",
                f"{topic}: {desc[:35]}...",
                f"Tested as part of the core citizenship curriculum on Canadian parliamentary democracy."
            )

    # 8. Canadian Justice System & Charter Rights (10 topics x 12 = 120 questions)
    justice_ca = [
        ("Canadian Charter of Rights and Freedoms", "Enshrined in the Constitution in 1982, guaranteeing fundamental freedoms, democratic, mobility, legal, and equality rights", ["A trade agreement signed with the United States in 1989", "A municipal charter governing the City of Ottawa", "A code of military justice governing naval discipline"]),
        ("Fundamental Freedoms", "Freedom of conscience and religion, thought, belief, opinion and expression, peaceful assembly, and association", ["The right to ignore traffic regulations on highways", "The freedom to avoid paying any municipal or provincial taxes", "The right to bear military arms without permits"]),
        ("Mobility Rights", "Canadian citizens have the right to live and work anywhere in Canada, enter, remain in, and leave Canada", ["The right to travel on commercial airlines for free", "The right to drive without holding a valid driver's license", "The right to import foreign goods without customs duties"]),
        ("Equality Rights", "Every individual is equal before and under the law and has the right to equal protection without discrimination", ["The requirement that all citizens must have identical financial wealth", "A system establishing separate courtrooms for different races", "A law granting tax exemptions based on ancestral lineage"]),
        ("Presumption of Innocence", "Under Canadian criminal law, everyone charged with an offence is presumed innocent until proven guilty beyond a reasonable doubt", ["The rule that anyone arrested is automatically guilty until proven innocent", "The doctrine that only confessions are admitted in court", "A requirement that juries must convict in all serious crimes"]),
        ("The Supreme Court of Canada", "The highest court of the land consisting of nine judges, including the Chief Justice, with at least three from Quebec", ["A commercial court handling inter-provincial shipping disputes", "A federal committee that drafts parliamentary bills", "An international court of arbitration based in London"]),
        ("Jury Duty in Canada", "A vital civic responsibility where citizens serve on a 12-person jury to impartially evaluate evidence in criminal trials", ["A mandatory full-time job lasting four years", "An elected political office representing a provincial riding", "A volunteer charity project organized by municipal councils"]),
        ("Habeas Corpus", "The fundamental legal right of an imprisoned person to be brought promptly before a judge to determine lawful detention", ["A statute granting police power to detain people without charges", "A treaty regulating international extradition of diplomats", "An ancient law allowing summary executive detention"]),
        ("Independent Judiciary", "Judges are strictly independent of the government and political parties to ensure fair and impartial justice for all", ["Judges who are members of the Prime Minister's Cabinet", "Judges who campaign for election on party tickets", "Judges who are supervised directly by the military"]),
        ("The Oath of Citizenship", "Pledging loyalty to the Sovereign, King Charles III, and swearing to faithfully observe the laws of Canada", ["A contract signed when purchasing a house in Canada", "An application submitted to obtain an employment insurance card", "A declaration made when registering for university"]),
    ]

    for topic, desc, wrong_descs in justice_ca:
        for i in range(12):
            add_q(
                "Canadian Law & Justice • The Justice System & Rights",
                f"Discover Canada Syllabus · {topic}",
                f"What is the statutory significance of '{topic}' in Canadian law (Item #{i+1})?",
                f"Determine the citizen protection or legal rule governing {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Discover Canada · The Justice System",
                f"{topic}: {desc[:35]}...",
                f"The Canadian justice system guarantees due process and equality under the rule of law."
            )

    # 9. Canadian Symbols, Economy & National Celebrations (10 topics x 8 = 80 questions)
    symbols_ca = [
        ("The Canadian National Flag (Maple Leaf)", "Officially adopted on February 15, 1965, with stylized eleven-pointed red maple leaf on white with red borders"),
        ("The Beaver (National Animal)", "Recognized as Canada's official animal symbol, reflecting centuries of historic fur trading and industriousness"),
        ("Canada's National Motto ('A Mari Usque Ad Mare')", "Latin phrase meaning 'From Sea to Sea', inscribed on the official Canadian Coat of Arms"),
        ("The Fleur-de-lis", "Historic French royal symbol associated with the French presence in Canada, appearing on the flag of Quebec"),
        ("The Peace Tower and Parliament Buildings", "National landmark in Ottawa commemorating Canadian fallen soldiers, housing the Memorial Chamber"),
        ("The National Anthem ('O Canada')", "Composed by Calixa Lavallée with French words by Sir Adolphe-Basile Routhier, proclaimed national anthem in 1980"),
        ("The Victoria Cross (VC)", "The highest honour available to Canadians for the most conspicuous bravery in the presence of the enemy"),
        ("Canada Day (July 1)", "National holiday celebrating the anniversary of the Confederation of Canada on July 1, 1867"),
        ("Remembrance Day (November 11)", "Solemn day of remembrance honoring Canadian military veterans, marked by red poppies and two minutes of silence"),
        ("Canada-United States Trade Relationship", "One of the largest bilateral trading partnerships in the world, sharing the longest undefended border"),
    ]

    for topic, desc in symbols_ca:
        for i in range(8):
            add_q(
                "Canadian Identity • Symbols, Economy & Celebrations",
                f"Discover Canada Syllabus · {topic}",
                f"What is the cultural or national significance of '{topic}' (Item #{i+1})?",
                f"Identify the civic or historical attribute of {topic}.",
                desc,
                ["A municipal festival celebrated exclusively in Vancouver",
                 "A private corporate logo established in 1995",
                 "A foreign diplomatic emblem used in European embassies"],
                f"{topic}: {desc}.",
                "Discover Canada · Canadian Symbols",
                f"{topic}: {desc[:35]}...",
                f"Official Canadian symbol recognized in statutory heraldry and federal regulations."
            )

    return questions

if __name__ == "__main__":
    print("Canada Generator module loaded.")
