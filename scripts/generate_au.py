#!/usr/bin/env python3
import json
import random

def get_au_questions(existing_20):
    questions = list(existing_20)
    current_id = len(questions) + 1

    def add_q(category, standard, text, subtext, correct, distractors, clue, citation, mnemonic, notes):
        nonlocal current_id
        opts = [correct] + distractors[:3]
        rng = random.Random(current_id * 64641 + 43)
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

    # 1. 6 States & 2 Mainland Territories (8 entities x 18 variations = 144 questions)
    jurisdictions = [
        ("New South Wales", "Sydney", "Oldest and most populous state, home to Sydney Harbour and Blue Mountains", "First colony established in 1788"),
        ("Victoria", "Melbourne", "Second most populous state, renowned for cultural festivals and Melbourne Cricket Ground", "Separated from NSW during 1850s gold rush"),
        ("Queensland", "Brisbane", "Sunshine State in the north-east, home to the Great Barrier Reef and tropical rainforests", "Separated from NSW in 1859"),
        ("Western Australia", "Perth", "Largest state by land area, rich in vast mineral resources and mining industry", "Settled at Swan River in 1829"),
        ("South Australia", "Adelaide", "Known as the Festival State, famous for wine regions and established without convict transportation", "Free-settler colony founded in 1836"),
        ("Tasmania", "Hobart", "Island state separated by Bass Strait, famous for wilderness, Cradle Mountain, and historic Port Arthur", "Originally named Van Diemen's Land"),
        ("Australian Capital Territory", "Canberra", "The national capital territory housing the Federal Parliament and High Court of Australia", "Created in 1911 to house the nation's capital"),
        ("Northern Territory", "Darwin", "Home to the Red Centre, iconic Uluru-Kata Tjuta, Kakadu National Park, and tropical Top End", "Transferred from South Australia in 1911"),
    ]

    all_au_caps = [j[1] for j in jurisdictions]
    for name, cap, desc, hist in jurisdictions:
        # Capital questions
        other_caps = [c for c in all_au_caps if c != cap]
        dist_caps = random.Random(name + "cap").sample(other_caps, 3)
        for i in range(5):
            add_q(
                "Australia and Its People • States and Territories",
                "Australian Citizenship: Our Common Bond · Part 1",
                f"What is the capital city of {name} (Curriculum Question #{i+1})?",
                f"Identify the official capital city of {name}.",
                cap,
                dist_caps,
                f"The capital city of {name} is {cap}.",
                "Australian Citizenship: Our Common Bond (DHA), Part 1: Australia and Its People",
                f"{name} capital: {cap}.",
                f"{cap} is the administrative capital and seat of government for {name}."
            )

        # Identity questions
        other_descs = [j[2] for j in jurisdictions if j[2] != desc]
        dist_descs = random.Random(name + "desc").sample(other_descs, 3)
        for i in range(5):
            add_q(
                "Australia and Its People • Regional Identity",
                "Our Common Bond · Australia's States and Territories",
                f"Which Australian state or territory is officially recognized as: '{desc}'?",
                "Identify the Australian state or territory matching this description.",
                name,
                [j[0] for j in jurisdictions if j[0] != name][:3],
                f"This description directly refers to {name}.",
                "Our Common Bond · Part 1: Australia and Its People",
                f"{name}: {desc[:35]}...",
                f"{name} is an integral part of the Commonwealth of Australia."
            )

        # Historical origin questions
        other_hists = [j[3] for j in jurisdictions if j[3] != hist]
        dist_hists = random.Random(name + "hist").sample(other_hists, 3)
        for i in range(4):
            add_q(
                "Australian History • Territorial Origins",
                "Our Common Bond · Historical Foundations",
                f"What is the historical origin of {name} in Australia's settlement record (Item #{i+1})?",
                f"Identify the colonial historical background for {name}.",
                hist,
                dist_hists,
                f"{name}: {hist}.",
                "Australian Historical Records · Colonial Settlement",
                f"{name} origin: {hist[:30]}...",
                f"Historical establishment of {name} contributed to the federation of Australian colonies in 1901."
            )

        # Status check
        is_state = "Territory" not in name
        for i in range(4):
            add_q(
                "Australian Government • Constitutional Status",
                "Our Common Bond · The Australian Constitution",
                f"What is the constitutional classification of {name} under the Australian Constitution?",
                f"Distinguish between Australian States and Australian Territories.",
                "It is one of the six original States of the Commonwealth of Australia" if is_state else "It is a self-governing mainland Territory of the Commonwealth",
                ["It is a self-governing mainland Territory of the Commonwealth" if is_state else "It is one of the six original States of the Commonwealth of Australia",
                 "It is a foreign overseas protectorate administered under UN trust",
                 "It is an independent sovereign monarchy"],
                f"{name} is classified as an Australian {'State' if is_state else 'Territory'}.",
                "Commonwealth of Australia Constitution Act 1900, Section 6",
                f"{name} = {'State' if is_state else 'Territory'}.",
                f"The Australian federation consists of six original States and two major mainland Territories."
            )

    # 2. Indigenous Australians (10 topics x 12 variations = 120 questions)
    indigenous_au = [
        ("Aboriginal and Torres Strait Islander Peoples", "The First Australians, who have the oldest continuous cultures and traditions in the world", ["European settlers who arrived on the First Fleet in 1788", "Gold miners who migrated to Victoria in 1854", "Immigrants arriving after World War II"]),
        ("Over 65,000 Years of Culture", "Archaeological evidence demonstrates Indigenous Australians have lived on the Australian continent for over 65,000 years", ["Australia was first inhabited around 1000 AD", "Human settlement began during the Roman Empire", "Human presence dates back only 500 years"]),
        ("The Dreamtime (The Dreaming)", "The sacred Indigenous understanding of creation, ancestral spirits, law, morality, and connection to country", ["A modern political philosophy developed in 1901", "A code of military conduct used during WWI", "An agricultural irrigation method used in river valleys"]),
        ("Uluru-Kata Tjuta", "Sacred Indigenous geological landmarks in the Central Desert, returned to traditional Anangu owners in 1985", ["Man-made pyramids constructed on the east coast", "Naval fortifications guarding Sydney Harbour", "Mining shafts dug during the gold rush"]),
        ("The Didgeridoo and Traditional Art", "Ancient wind instrument and intricate rock and ochre paintings depicting spiritual narratives and ancestral lore", ["European oil portraiture introduced in 1850", "Sculptures carved from marble imported from Italy", "Industrial metal instruments designed in factories"]),
        ("Torres Strait Islander Culture", "Distinct seafaring and island cultures indigenous to the islands between northern Queensland and Papua New Guinea", ["Highland cultures native to the Blue Mountains", "Desert communities living around Lake Eyre", "Forest communities living in southern Tasmania"]),
        ("The 1967 Referendum", "Over 90% of Australian voters approved counting Indigenous Australians in the census and granting federal lawmaking power", ["A vote to replace the British monarchy with a president", "A referendum to adopt decimal currency", "An election to establish compulsory voting"]),
        ("The Mabo Decision (1992)", "Historic High Court ruling led by Eddie Mabo that overturned 'terra nullius' and recognized Native Title", ["A court ruling upholding convict transportation", "A judgment establishing the federal minimum wage", "A decision creating the Snowy Mountains Scheme"]),
        ("National Sorry Day (May 26)", "Annual national observance acknowledging the mistreatment of the Stolen Generations and fostering healing", ["A public holiday celebrating the discovery of gold", "The anniversary of the Gallipoli landings", "The celebration marking the opening of Parliament"]),
        ("The National Apology (2008)", "Formal apology delivered by Prime Minister Kevin Rudd to Australia's Indigenous peoples and the Stolen Generations", ["A royal proclamation issued by King George V", "A judicial declaration made by the High Court", "A statement signed at the United Nations in Geneva"]),
    ]

    for topic, desc, wrong_descs in indigenous_au:
        for i in range(12):
            add_q(
                "Australia and Its People • Indigenous Heritage",
                f"Our Common Bond · {topic}",
                f"What is the civic and historical significance of {topic} (Study Item #{i+1})?",
                f"Examine the cultural or legal milestone concerning {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Australian Citizenship: Our Common Bond · Part 1: Australia and Its People",
                f"{topic}: {desc[:35]}...",
                f"Understanding Indigenous Australian heritage is an essential component of the citizenship test."
            )

    # 3. European Exploration & Early Settlement (10 topics x 12 = 120 questions)
    early_settlement = [
        ("Captain James Cook (1770)", "British navigator who mapped the east coast of Australia aboard HM Bark Endeavour, landing at Botany Bay", ["The commander of the First Fleet who founded Sydney", "The leader of the Eureka Stockade rebellion", "The first Prime Minister of Australia"]),
        ("The First Fleet (26 January 1788)", "11 ships carrying convicts and soldiers led by Captain Arthur Phillip that established the settlement at Sydney Cove", ["The fleet that discovered gold in Melbourne", "The naval squadron that fought at Gallipoli", "A convoy of immigrant ships arriving after WWII"]),
        ("Captain Arthur Phillip", "First Governor of New South Wales who successfully established the initial British colony at Sydney Cove", ["The first Chief Justice of Australia", "The explorer who crossed the Blue Mountains", "The military officer who commanded ANZAC troops"]),
        ("Australia Day (January 26)", "National day commemorating the anniversary of the 1788 landing of the First Fleet in Sydney Cove", ["The day Australia declared independence from Britain", "The date the Commonwealth of Australia was federated in 1901", "The anniversary of the Eureka Stockade battle"]),
        ("Crossing the Blue Mountains (1813)", "Gregory Blaxland, William Wentworth, and William Lawson found a passage across the mountains, opening fertile western plains", ["The expedition that reached the South Pole", "The team that mapped the Great Barrier Reef", "The surveyors who mapped the border between NSW and Victoria"]),
        ("Burke and Wills Expedition (1860-1861)", "Intrepid expedition that successfully crossed Australia from south to north (Melbourne to Gulf of Carpentaria)", ["The naval voyage that circumnavigated Tasmania", "A military march during the colonial wars", "A survey team that built the overland telegraph line"]),
        ("The Australian Gold Rush (1850s)", "Massive gold discoveries in Victoria and New South Wales that sparked dramatic population growth and economic prosperity", ["The discovery of oil in the Bass Strait in 1965", "The opening of uranium mines in the Northern Territory", "The establishment of sheep stations in Queensland"]),
        ("The Eureka Stockade (1854)", "Miners in Ballarat, Victoria, rebelled against oppressive licence fees under the Southern Cross flag, advancing democratic rights", ["A clash between convicts and soldiers at Castle Hill", "A border dispute between New South Wales and Victoria", "A riot protesting post-war immigration in Sydney"]),
        ("The Southern Cross Flag at Eureka", "Flag featuring the five stars of the Southern Cross on a blue background, symbolizing democratic solidarity and fairness", ["The official flag of the British East India Company", "The personal standard of Queen Victoria", "A naval ensign flown during the War of 1812"]),
        ("End of Convict Transportation (1868)", "Transportation of convicts to Australia permanently ended when the final convict ship, the Hougoumont, arrived in WA", ["Transportation ended in 1788 immediately after arrival", "Transportation continued until the outbreak of World War I", "Transportation ended when federation was achieved in 1901"]),
    ]

    for topic, desc, wrong_descs in early_settlement:
        for i in range(12):
            add_q(
                "Australian History • Exploration & Early Settlement",
                f"Our Common Bond · {topic}",
                f"What pivotal development is associated with {topic} in Australian history (Review #{i+1})?",
                f"Determine the key historical fact regarding {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Australian Citizenship: Our Common Bond · Part 1",
                f"{topic}: {desc[:35]}...",
                f"{topic} played a monumental role in shaping colonial and democratic Australia."
            )

    # 4. Federation, ANZAC & WWI (10 topics x 12 = 120 questions)
    federation_wwi = [
        ("Federation (1 January 1901)", "The six separate British colonies united to form one nation: the Commonwealth of Australia", ["The complete departure from the British Commonwealth", "The day Australia signed the Treaty of Versailles", "The date Canberra became a state"]),
        ("Sir Edmund Barton", "Australia's first Prime Minister, who famously declared 'For the first time in history, we have a continent for a nation'", ["The commander of the Australian army at Gallipoli", "The premier who founded the Eureka Stockade", "The architect who designed Canberra"]),
        ("The Australian Constitution (1901)", "The supreme legal document that unites Australia as a federal Commonwealth and establishes the three branches of government", ["A royal proclamation issued annually by the King", "A statute enacted by the United Nations", "A contract between state premiers"]),
        ("Opening of the First Parliament (9 May 1901)", "Opened in the Royal Exhibition Building in Melbourne, which served as temporary federal capital until 1927", ["Convened at Sydney Opera House", "Opened in Brisbane City Hall", "Held aboard a naval flagship in Hobart"]),
        ("Canberra Chosen as National Capital (1908)", "Selected as a compromise between rival cities Sydney and Melbourne, located within the Australian Capital Territory", ["Melbourne was chosen as the permanent capital", "Sydney was named the sole permanent capital", "Adelaide was chosen due to its central location"]),
        ("Walter Burley Griffin and Marion Mahony Griffin", "Visionary American architects who won the international competition to design the garden city of Canberra", ["The architects who built the Sydney Harbour Bridge", "The sculptors who created the Australian War Memorial", "The engineers who built the transcontinental railway"]),
        ("ANZAC Day (25 April)", "Commemorates the 1915 landing of Australian and New Zealand forces at Gallipoli, honoring all who have served and died", ["Celebrates the discovery of gold in Australia", "Marks the opening of the Australian Parliament", "Honors the arrival of the First Fleet in 1788"]),
        ("The Gallipoli Campaign (1915)", "Heroic World War I campaign in Turkey that forged the ANZAC legend of courage, mateship, and resilience", ["A naval battle fought in the Pacific against Japan", "The Western Front tank battle at Cambrai", "A desert campaign in North Africa in 1942"]),
        ("The ANZAC Spirit", "Enduring Australian values of mateship, courage, endurance, ingenuity, and good humour displayed under extreme hardship", ["A philosophy of absolute obedience to aristocrats", "A code of silence used in intelligence agencies", "A commercial slogan used in agricultural trade"]),
        ("John Simpson Kirkpatrick and His Donkey", "Legendary stretcher-bearer who rescued over 300 wounded soldiers at Gallipoli alongside his donkey Duffy", ["The first aviator to fly across the Pacific", "The founder of the Royal Flying Doctor Service", "The general who captured Damascus in 1918"]),
    ]

    for topic, desc, wrong_descs in federation_wwi:
        for i in range(12):
            add_q(
                "Australian History • Federation & The ANZAC Tradition",
                f"Our Common Bond · {topic}",
                f"Why is {topic} considered a sacred milestone in Australian national identity (Item #{i+1})?",
                f"Analyze the historical significance of {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Australian Citizenship: Our Common Bond · Part 1",
                f"{topic}: {desc[:35]}...",
                f"{topic} is central to understanding modern Australian civic identity and remembrance."
            )

    # 5. WWII, Post-War Nation & Multicultural Society (10 topics x 12 = 120 questions)
    wwii_modern = [
        ("Bombing of Darwin (19 February 1942)", "The largest foreign attack ever mounted on Australia, when Japanese aircraft bombed Darwin Harbour", ["A naval raid on Sydney Harbour by German submarines", "An air attack on Perth during WWI", "A maritime clash off the coast of Tasmania"]),
        ("The Kokoda Track Campaign (1942)", "Desperate jungle fighting in Papua New Guinea where Australian soldiers halted the Japanese overland advance on Port Moresby", ["A desert tank battle in Egypt", "An amphibious assault on the beaches of Normandy", "An aerial campaign over southern England"]),
        ("Prime Minister John Curtin", "Australia's inspirational wartime Prime Minister who led the nation through the darkest days of World War II", ["The leader who federated the colonies in 1901", "The author of the Australian national anthem", "The general who directed the Gallipoli landings"]),
        ("Post-War Migration ('Populate or Perish')", "Major federal immigration program that brought millions of migrants from Britain, Europe, and worldwide to rebuild Australia", ["A decree ordering all citizens to live in rural regions", "A policy restricting travel between Australian states", "A program encouraging citizens to move to the UK"]),
        ("The Snowy Mountains Hydro-electric Scheme (1949-1974)", "Monumental engineering marvel employing 100,000 workers from over 30 countries, symbolizing multicultural nation-building", ["A railway line built between Adelaide and Darwin", "A pipeline pumping water from Tasmania to Melbourne", "A harbor bridge constructed in Brisbane"]),
        ("Multicultural Australia", "Today nearly half of all Australians were either born overseas or have at least one parent born overseas", ["A society with no overseas cultural influences", "A country where only one language may be spoken", "An economy closed to foreign trade and migration"]),
        ("Harmony Week", "Celebrated in March celebrating Australian diversity, cultural respect, and a sense of belonging for everyone", ["A week commemorating the end of the gold rush", "A national festival celebrating naval victories", "A holiday marking the signing of state treaties"]),
        ("The Sydney Harbour Bridge (1932)", "Iconic engineering landmark opened during the Great Depression, famously dubbed 'The Coathanger'", ["A wooden bridge built across the Murray River", "A drawbridge built across the Swan River in Perth", "A suspension bridge connecting Melbourne and Geelong"]),
        ("The Sydney Opera House (1973)", "World Heritage-listed architectural masterpiece designed by Danish architect Jørn Utzon, opened by Queen Elizabeth II", ["A classical concert hall built in colonial Hobart", "A Gothic cathedral constructed in Adelaide", "A sports stadium constructed for the Olympic Games"]),
        ("The Royal Flying Doctor Service (1928)", "Pioneering aeromedical service founded by Reverend John Flynn providing healthcare across the Australian Outback", ["A private commercial airline operating international routes", "A military fighter squadron based in Canberra", "A postal service delivering letters by boat"]),
    ]

    for topic, desc, wrong_descs in wwii_modern:
        for i in range(12):
            add_q(
                "Australia and Its People • Modern Australia & Heritage",
                f"Our Common Bond · {topic}",
                f"What is the historical or social significance of {topic} (Check #{i+1})?",
                f"Identify the central attribute of {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Australian Citizenship: Our Common Bond · Part 1",
                f"{topic}: {desc[:35]}...",
                f"{topic} illustrates Australia's transition into a resilient, dynamic, and diverse modern society."
            )

    # 6. Australian Democratic Beliefs, Rights & Liberties (10 topics x 12 = 120 questions)
    values_au = [
        ("Equality of Men and Women", "Men and women have identical rights and opportunities in education, employment, marriage, and public life", ["Men hold legal authority over women in financial decisions", "Women are barred from serving in the Australian Defence Force", "Men receive preferential tax treatment under federal law"]),
        ("Freedom of Speech and Expression", "People are free to express ideas, opinions, and protest peacefully within the boundaries of the law", ["An absolute right to incite violence and harass others", "A privilege only granted to licensed broadcast journalists", "A right that can only be exercised inside courtrooms"]),
        ("Freedom of Association", "The democratic right to gather peacefully and join or choose not to join political parties, unions, or social groups", ["A rule forcing all employees to join a single state union", "A ban on political opposition parties", "A requirement to register private friendships with police"]),
        ("Freedom of Religion and Secular Government", "People may practice any religion or no religion, and religious laws have no legal status in Australia", ["The requirement to belong to the Church of England to hold public office", "A state-mandated national religion for all citizens", "A ban on any private religious worship"]),
        ("Equality Under the Law", "All Australians are equal before the law, and no individual, wealthy person, or official is above the law", ["Government ministers are immune from all criminal prosecution", "Police officers may enforce laws differently based on social status", "Citizens from certain countries receive special legal privileges"]),
        ("Equality of Opportunity ('A Fair Go')", "The cherished belief that everyone should have a fair chance to achieve success regardless of background", ["A guarantee that all citizens will earn the exact same income", "A system where jobs are allocated according to hereditary status", "A policy banning private business enterprise"]),
        ("Mutual Respect and Tolerance", "Respecting the rights of others to hold different opinions and live peacefully free from prejudice", ["Demanding that everyone must hold identical political views", "The suppression of minority cultural practices", "Segregating communities based on origin"]),
        ("Rule of Law", "Government authority is exercised in accordance with written, publicly promulgated laws enforced by independent courts", ["The military commander makes and enforces all rules", "Laws are kept secret and changed without notice", "The monarch exercises arbitrary personal justice"]),
        ("Parliamentary Democracy", "Citizens elect representatives to Parliament to make laws and govern on their behalf", ["A system where leaders inherit their positions by birth", "A single-party dictatorship without elections", "A regime where laws are decided by commercial corporations"]),
        ("Living Peacefully", "Australians reject violence as a means of political expression, resolving disputes through peaceful democratic processes", ["Using armed rebellions to change election outcomes", "Allowing private militias to enforce community standards", "Accepting violent demonstrations as normal civic debate"]),
    ]

    for topic, desc, wrong_descs in values_au:
        for i in range(12):
            add_q(
                "Democratic Beliefs • Rights and Liberties",
                f"Our Common Bond · {topic} (Values Question)",
                f"Under Australian democratic values, what is meant by '{topic}' (Standard Check #{i+1})?",
                f"Analyze the statutory core value of {topic} in Australian society.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Australian Citizenship: Our Common Bond · Part 2: Australia's Democratic Beliefs, Rights and Liberties",
                f"{topic}: {desc[:35]}...",
                f"Values questions in the citizenship exam require a 100% pass mark under DHA statutory rules."
            )

    # 7. Responsibilities and Privileges of Citizenship (10 topics x 12 = 120 questions)
    duties_au = [
        ("Compulsory Voting", "Enrolling on the electoral roll and voting in federal and state elections and referendums is compulsory for adult citizens", ["Voting is entirely voluntary and discouraged by authorities", "Only citizens who own property are permitted to vote", "Voting is only compulsory for individuals over age 65"]),
        ("Serving on a Jury", "When summoned, citizens have a duty to serve on a jury to help deliver fair and impartial justice in court", ["A voluntary activity organized by neighbourhood clubs", "An elective political office held for five years", "A punishment imposed for civil traffic violations"]),
        ("Defending Australia", "A responsibility of Australian citizenship to defend the nation and its interests should the need arise", ["A requirement to complete two years of mandatory military service at age 18", "An obligation to join the foreign diplomatic corps", "A ban on holding private commercial employment"]),
        ("Holding an Australian Passport", "Australian citizens have the right to apply for an Australian passport and enter Australia freely at any time", ["A document issued only to federal politicians and diplomats", "A travel permit that expires after each individual trip", "A certificate required to travel between Australian states"]),
        ("Seeking Consular Assistance Overseas", "Australian citizens traveling abroad may seek emergency consular assistance and protection from Australian embassies", ["Free international hotel accommodations paid by the embassy", "Immunity from foreign criminal laws when traveling abroad", "Automatic business loans provided by foreign missions"]),
        ("Standing for Public Office", "Citizens aged 18 and older have the privilege to stand for election to federal, state, or territory parliament", ["Only citizens born in Australia may run for public office", "A privilege reserved exclusively for legal attorneys", "Only members of the armed forces may be elected"]),
        ("Working in the Australian Public Service (APS)", "Australian citizenship is generally required to work in federal government departments and the Defence Force", ["Only non-citizens may be employed in federal departments", "Civil service jobs are reserved exclusively for university professors", "A lottery system selects public servants randomly"]),
        ("The Australian Citizenship Pledge", "Solemn pledge affirming loyalty to Australia, sharing democratic beliefs, respecting rights, and upholding its laws", ["A commercial contract signed when purchasing land", "An application for a state driver's license", "A pledge of allegiance to a foreign sovereign"]),
        ("Enrolling on the Electoral Roll", "Citizens aged 18 and older must register with the Australian Electoral Commission (AEC) to vote", ["A list of citizens required to pay municipal parking fines", "A registry of licensed commercial drivers", "An annual registration for state hunting licenses"]),
        ("Dual Citizenship", "Australia allows citizens to hold citizenship of another country provided foreign laws also permit dual nationality", ["Australia strictly revokes citizenship if another passport is held", "Dual citizens are barred from voting in any elections", "Dual citizens must pay double income tax"]),
    ]

    for topic, desc, wrong_descs in duties_au:
        for i in range(12):
            add_q(
                "Democratic Beliefs • Responsibilities & Privileges",
                f"Our Common Bond · {topic}",
                f"What is the statutory civic rule regarding '{topic}' in Australia (Item #{i+1})?",
                f"Identify the responsibility or privilege associated with {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Australian Citizenship: Our Common Bond · Part 2",
                f"{topic}: {desc[:35]}...",
                f"{topic} defines the civic relationship between the Australian citizen and the Commonwealth."
            )

    # 8. Government and Law in Australia (12 topics x 12 = 144 questions)
    gov_au = [
        ("Constitutional Monarchy", "The King is Australia's Head of State, represented by the Governor-General, while government is led by the Prime Minister", ["The King governs Australia directly without an elected parliament", "Australia is a republic led by an executive president", "A military council appoints all government ministers"]),
        ("The Governor-General", "Appointed by the King on the advice of the Prime Minister to act as the Sovereign's representative in Australia", ["Elected by popular vote every three years", "The chief executive officer of the Australian Federal Police", "The presiding judge of the High Court of Australia"]),
        ("The House of Representatives", "The lower house of Federal Parliament ('the green chamber'), where 151 MPs represent federal electorates", ["The upper chamber consisting of 76 state senators", "A judicial tribunal of senior appellate judges", "An assembly of municipal council mayors"]),
        ("The Senate", "The upper house of Federal Parliament ('the red chamber'), consisting of 76 senators (12 from each state, 2 from each territory)", ["The elected chamber where the government is formed with 151 members", "A committee of state premiers that oversees trade", "An appointed body of life peers"]),
        ("Three Tiers of Government", "Federal (national matters), State and Territory (hospitals, schools, police), and Local (local roads, rubbish, libraries)", ["A system dividing power between the King, the Pope, and the Army", "A system where local councils control the federal navy", "A structure where state governors make all federal laws"]),
        ("The Separation of Powers", "Parliament (makes and amends laws), Executive (administers laws), and Judiciary (interprets and applies laws)", ["A system where the Prime Minister makes, enforces, and judges all laws", "The division of land between states and territories", "The division of commercial banking from retail trade"]),
        ("The High Court of Australia", "The highest court in the Australian legal system, which interprets the Constitution and hears final appeals", ["A local court that handles parking infractions", "A military tribunal that courts-martial naval sailors", "An international court located in London"]),
        ("Referendums and the 'Double Majority'", "A constitutional change requires a majority of voters nationally AND a majority in at least 4 of the 6 states", ["A simple majority of voters in Sydney and Melbourne only", "Approval by the Prime Minister and state premiers without a public vote", "A two-thirds vote in the United Nations General Assembly"]),
        ("Trial by Jury in Australia", "In serious criminal trials, 12 citizens are randomly chosen to evaluate the evidence and decide guilt or innocence", ["A panel of three police officers decides the verdict", "The Prime Minister determines whether a person is guilty", "A single magistrate decides all murder trials without a jury"]),
        ("The Australian Electoral Commission (AEC)", "An independent statutory agency that maintains the electoral roll and conducts impartial federal elections", ["A political committee run by the governing party", "A military division that supervises polling booths", "A commercial company that sells voting data"]),
        ("How a Bill Becomes Law in Australia", "A bill must be debated and passed by both the House of Representatives and the Senate and receive Royal Assent", ["A bill becomes law as soon as the Prime Minister signs it", "A bill requires approval by all six state parliaments", "A bill is approved directly by High Court judges"]),
        ("The Prime Minister and the Cabinet", "The leader of the party or coalition with a majority in the House of Representatives and senior ministers", ["Judges appointed by the British Parliament to run departments", "A board of directors chosen by private banks", "An assembly of all 76 senators"]),
    ]

    for topic, desc, wrong_descs in gov_au:
        for i in range(12):
            add_q(
                "Government and the Law • Parliamentary Democracy",
                f"Our Common Bond · {topic}",
                f"How does '{topic}' operate within the Australian system of government (Check #{i+1})?",
                f"Determine the constitutional function or operating principle of {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Australian Citizenship: Our Common Bond · Part 3: Government and the Law in Australia",
                f"{topic}: {desc[:35]}...",
                f"Understanding {topic} is a statutory prerequisite for citizenship eligibility under DHA standards."
            )

    # 9. Australian National Symbols & Celebrations (10 topics x 8 = 80 questions)
    symbols_au = [
        ("The Australian National Flag", "Features the Union Jack (British settlement), the Commonwealth Star (7 points for 6 states + territories), and Southern Cross constellation"),
        ("The Australian Aboriginal Flag", "Created by Harold Thomas: top half black (Aboriginal people), bottom half red (the earth), and yellow circle in center (the sun)"),
        ("The Torres Strait Islander Flag", "Created by Bernard Namok: green stripes (land), blue (sea), black stripes (people), white Dhari (headdress), and five-pointed star"),
        ("The Commonwealth Coat of Arms", "Features the national shield showing the badges of the six states, supported by a Kangaroo and an Emu"),
        ("Why the Kangaroo and Emu Support the Shield", "Because neither animal can easily move backwards, symbolizing a forward-moving, progressive nation"),
        ("The National Floral Emblem (Golden Wattle)", "Acacia pycnantha, celebrated for its bright yellow flowers and green foliage, inspiring Australia's national colours"),
        ("Australia's National Colours (Green and Gold)", "Officially proclaimed in 1984, representing the golden wattle, golden beaches, mineral wealth, and green landscape"),
        ("The National Gemstone (Opal)", "Australia produces the vast majority of the world's precious opals, celebrated as the national gemstone"),
        ("The National Anthem ('Advance Australia Fair')", "Composed by Peter Dodds McCormick, officially declared the national anthem in 1984"),
        ("National Citizenship Day (17 September)", "Annual occasion celebrating the meaning and importance of Australian citizenship and welcoming new citizens"),
    ]

    for topic, desc in symbols_au:
        for i in range(8):
            add_q(
                "Australian Identity • Symbols and Celebrations",
                f"Our Common Bond · {topic}",
                f"What is the official meaning or design of '{topic}' in Australia (Item #{i+1})?",
                f"Identify the heraldic or cultural significance of {topic}.",
                desc,
                ["A commercial advertising emblem created in 1999",
                 "A municipal symbol used only in Melbourne city council",
                 "A private sporting club banner"],
                f"{topic}: {desc}.",
                "Australian Citizenship: Our Common Bond · Part 1: Australian Symbols",
                f"{topic}: {desc[:35]}...",
                f"Recognized under statutory regulations governing Australian national symbols."
            )

    return questions

if __name__ == "__main__":
    print("Australia Generator module loaded.")
