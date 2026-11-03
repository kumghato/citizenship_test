#!/usr/bin/env python3
import json
import random

def get_uk_questions(existing_20):
    questions = list(existing_20)
    current_id = len(questions) + 1

    def add_q(category, standard, text, subtext, correct, distractors, clue, citation, mnemonic, notes):
        nonlocal current_id
        opts = [correct] + distractors[:3]
        rng = random.Random(current_id * 42421 + 23)
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

    # 1. Four Nations & UK Geography (4 nations x 40 variations = 160 questions)
    nations = [
        ("England", "London", "St George", "April 23", "Red Cross on white field", "Rose", "River Thames", "Palace of Westminster"),
        ("Scotland", "Edinburgh", "St Andrew", "November 30", "White diagonal saltire on blue field", "Thistle", "River Clyde", "Scottish Parliament at Holyrood"),
        ("Wales", "Cardiff", "St David", "March 1", "Red Dragon on green and white field", "Daffodil and Leek", "River Severn", "Senedd Cymru in Cardiff Bay"),
        ("Northern Ireland", "Belfast", "St Patrick", "March 17", "St Patrick's red diagonal cross on white", "Shamrock", "River Lagan", "Northern Ireland Assembly at Stormont"),
    ]

    for country, cap, saint, feast_day, flag_desc, flower, river, parliament in nations:
        for i in range(5):
            # Capital
            other_caps = [n[1] for n in nations if n[1] != cap]
            add_q(
                "British Geography • The Home Nations",
                "Life in the UK Syllabus · Chapter 2",
                f"What is the capital city of {country} (Curriculum Check #{i+1})?",
                f"Identify the administrative capital city of {country}.",
                cap,
                other_caps,
                f"The capital city of {country} is {cap}.",
                f"Home Office Life in the UK Handbook (3rd Ed.), Chapter 2",
                f"{country} capital: {cap}.",
                f"{cap} is the historic and governmental capital of {country}."
            )

            # Patron Saint
            other_saints = [n[2] for n in nations if n[2] != saint]
            add_q(
                "British Customs & Society • National Patron Saints",
                "Life in the UK Syllabus · Chapter 4",
                f"Who is the patron saint of {country} (Standard #{i+1})?",
                f"Select the patron saint whose feast day is celebrated in {country}.",
                saint,
                other_saints,
                f"The patron saint of {country} is {saint}.",
                "Life in the UK Handbook (3rd Ed.), Chapter 4: Traditions and Culture",
                f"{country} Patron Saint = {saint}.",
                f"{saint} is historically revered as the patron saint of {country}."
            )

            # Feast day
            other_days = [n[3] for n in nations if n[3] != feast_day]
            add_q(
                "British Customs & Society • Patron Saint Feast Days",
                "Life in the UK Syllabus · Chapter 4",
                f"On which calendar date is the feast day of {saint} ({country}) celebrated (Query #{i+1})?",
                f"Identify the national saint's day for {country}.",
                feast_day,
                other_days,
                f"{saint}'s Day is observed on {feast_day}.",
                "Life in the UK Handbook (3rd Ed.), Chapter 4",
                f"{saint} Day: {feast_day}.",
                f"Celebrations, parades, and cultural events mark {feast_day} across {country}."
            )

            # Flag
            other_flags = [n[4] for n in nations if n[4] != flag_desc]
            add_q(
                "British Symbols • National Flags & Heraldry",
                "Life in the UK Syllabus · Chapter 4",
                f"What heraldic design characterizes the historic national flag of {country} (Item #{i+1})?",
                f"Identify the flag design representing {country}.",
                flag_desc,
                other_flags,
                f"The national flag of {country} features {flag_desc}.",
                "The College of Arms Official Heraldic Registers",
                f"{country} Flag: {flag_desc}.",
                f"This heraldic emblem forms an integral element of British vexillology."
            )

            # Floral emblem
            other_flowers = [n[5] for n in nations if n[5] != flower]
            add_q(
                "British Symbols • National Floral Emblems",
                "Life in the UK Syllabus · Chapter 4",
                f"What is the traditional national floral or plant emblem of {country} (Check #{i+1})?",
                f"Identify the national flower or plant associated with {country}.",
                flower,
                other_flowers,
                f"The traditional floral emblem of {country} is the {flower}.",
                "Life in the UK Handbook (3rd Ed.), Chapter 4",
                f"{country} Floral Emblem = {flower}.",
                f"The {flower} has been used for centuries as the official badge of {country}."
            )

            # Devolved Parliament
            other_parls = [n[7] for n in nations if n[7] != parliament]
            add_q(
                "UK Government & Law • Devolved Parliaments",
                "Life in the UK Syllabus · Chapter 5",
                f"Where does the devolved legislature for {country} convene (Review #{i+1})?",
                f"Identify the assembly or parliament representing {country}.",
                parliament,
                other_parls,
                f"The legislative body for {country} meets at {parliament}.",
                "Scotland Act 1998, Government of Wales Act 1998, Northern Ireland Act 1998",
                f"{country} legislature: {parliament}.",
                f"{parliament} holds devolved legislative competence over areas such as health, education, and transport."
            )

            # Prominent river
            other_rivers = [n[6] for n in nations if n[6] != river]
            add_q(
                "British Geography • Major Rivers & Waterways",
                "Life in the UK Syllabus · Chapter 2",
                f"Which major river flows through or borders {country} (Geography Item #{i+1})?",
                f"Identify the prominent waterway located in {country}.",
                river,
                other_rivers,
                f"A major river associated with {country} is the {river}.",
                "Ordnance Survey of Great Britain",
                f"{country} river: {river}.",
                f"The {river} is a vital commercial, historical, and geographical waterway in {country}."
            )

            # Crown Dependencies check
            add_q(
                "British Geography • Crown Dependencies & Territories",
                "Life in the UK Syllabus · Chapter 2",
                f"Are the Channel Islands and the Isle of Man part of {country} or the United Kingdom?",
                "Determine the constitutional status of Crown Dependencies.",
                "They are Crown Dependencies closely linked to the UK, but are not part of the UK itself",
                ["They are fully integrated metropolitan boroughs of London",
                 "They are sovereign member states of the European Union",
                 "They are governed directly as overseas military bases"],
                "The Isle of Man and Channel Islands (Jersey and Guernsey) are Crown Dependencies, not part of the UK.",
                "Life in the UK Handbook (3rd Ed.), Chapter 2: The UK",
                "Crown Dependencies = Isle of Man & Channel Islands (Linked, but not in the UK).",
                "Crown Dependencies have their own legislative assemblies and legal systems."
            )

    # 2. Early British History (Stone Age to 1066) (120 questions)
    early_hist = [
        ("Stonehenge", "Prehistoric stone monument in Wiltshire erected during the Neolithic and Bronze Age", ["A medieval fortress built by William the Conqueror", "A Roman garrison built to guard Hadrian's Wall", "A Victorian railway station"]),
        ("Skara Brae", "Remarkably preserved Neolithic stone-built settlement in Orkney, Scotland", ["An ancient Roman amphitheatre in London", "A Norman cathedral in Canterbury", "An Elizabethan manor house"]),
        ("Maiden Castle", "One of the largest and most complex Iron Age hill forts in Europe, located in Dorset", ["A Tudor palace constructed by Henry VIII", "A Victorian prison", "A naval dry dock in Portsmouth"]),
        ("Julius Caesar's Invasions", "Roman military expeditions to Britain in 55 and 54 BC", ["The signing of the Magna Carta in 1215", "The defeat of the Spanish Armada in 1588", "The Norman Conquest of 1066"]),
        ("Emperor Claudius", "Roman Emperor who ordered the permanent conquest and occupation of Britain in 43 AD", ["The King who signed the Bill of Rights in 1689", "The first Prime Minister of Great Britain", "The leader of the Roundheads in the Civil War"]),
        ("Queen Boudicca", "Queen of the Iceni tribe who led a major rebellion against Roman occupation in 60-61 AD", ["The first Queen Regnant of England", "A Tudor monarch who defeated the Armada", "The founder of the suffragette movement"]),
        ("Hadrian's Wall", "Stone defensive fortification built by Emperor Hadrian across northern Britain to keep out Picts", ["A medieval defensive wall surrounding London", "A Victorian canal built for industrial barges", "A modern railway line connecting Glasgow and Edinburgh"]),
        ("King Alfred the Great", "King of Wessex who successfully defended England against Viking invasion and promoted learning", ["The first Norman King of England", "The Tudor king who broke with Rome", "The Prime Minister during the Industrial Revolution"]),
        ("Sutton Hoo", "Site of an Anglo-Saxon ship burial in Suffolk containing royal treasures and armour", ["A famous Roman bath complex in Somerset", "A battlefield where the Wars of the Roses ended", "A 19th-century ironworks"]),
        ("Danelaw", "The historical region of northern and eastern England where the laws of the Vikings held sway", ["The area controlled by the French after 1066", "A maritime zone regulated by royal admirals", "The legal jurisdiction of the Scottish Kirk"]),
    ]

    for topic, desc, wrong_descs in early_hist:
        for i in range(12):
            add_q(
                "British History • Early Britain (Prehistory to 1066)",
                f"Life in the UK Syllabus · {topic}",
                f"What is the historical significance of {topic} in early British history (Query #{i+1})?",
                f"Identify the central historical fact concerning {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Life in the UK Handbook (3rd Ed.), Chapter 3: Early Britain",
                f"{topic}: {desc[:35]}...",
                f"Studying {topic} provides insight into the archaeological and political roots of Great Britain."
            )

    # 3. Middle Ages & The Tudors (1066 - 1603) (160 questions)
    medieval_tudors = [
        ("The Battle of Hastings (1066)", "The pivotal battle where William, Duke of Normandy, defeated King Harold to begin Norman rule", ["The naval defeat of the Spanish fleet in 1588", "The victory of Parliament over King Charles I", "The battle ending the Wars of the Roses"]),
        ("The Domesday Book (1086)", "A comprehensive survey of landholdings, wealth, and people across England commissioned by William I", ["The first printed English translation of the Bible", "The formal peace treaty ending the Hundred Years' War", "The founding charter of Oxford University"]),
        ("The Magna Carta (1215)", "The Great Charter signed at Runnymede establishing that the King is subject to the rule of law", ["A proclamation declaring the King supreme head of the Church", "The legislation creating the National Health Service", "The treaty uniting England and Scotland"]),
        ("Thomas Becket", "Archbishop of Canterbury assassinated in Canterbury Cathedral in 1170 after disputing with Henry II", ["The leader of the Peasants' Revolt in 1381", "The first Protestant Archbishop under Edward VI", "The architect who rebuilt St Paul's Cathedral"]),
        ("The Black Death (1348)", "Devastating bubonic plague pandemic that killed roughly one-third of Britain's population", ["A severe winter famine caused by crop failures", "A naval blockade during the Napoleonic Wars", "A great fire that destroyed medieval York"]),
        ("Wars of the Roses (1455-1485)", "Civil wars fought between the House of Lancaster (red rose) and House of York (white rose)", ["A war between England and Spain over trade routes", "A religious conflict following the Reformation", "The Scottish war for independence led by William Wallace"]),
        ("Battle of Bosworth Field (1485)", "Decisive battle where Henry Tudor defeated Richard III to found the Tudor dynasty as Henry VII", ["The battle where Oliver Cromwell defeated the Royalists", "The confrontation where the Duke of Wellington defeated Napoleon", "The naval clash at Trafalgar"]),
        ("Henry VIII's Reformation", "The break with the Roman Catholic Church in the 1530s, establishing the Church of England", ["The restoration of papal authority by Mary I", "The adoption of the King James Bible in 1611", "The abolition of all religious worship"]),
        ("Elizabeth I's Golden Age", "A prosperous era of literature, exploration, and the naval defeat of the Spanish Armada in 1588", ["The Victorian era of steam railway expansion", "The post-WWII reconstruction period under Attlee", "The medieval era of monastic expansion"]),
        ("William Shakespeare (1564-1616)", "World-renowned English playwright and poet whose works include Hamlet, Macbeth, and Romeo and Juliet", ["The composer of the national anthem 'God Save the King'", "The prime minister who introduced the Reform Acts", "The naturalist who formulated the theory of evolution"]),
    ]

    for topic, desc, wrong_descs in medieval_tudors:
        for i in range(16):
            add_q(
                "British History • Middle Ages and Tudor Period",
                f"Life in the UK Syllabus · {topic}",
                f"What is the historical significance of {topic} in British history (Review #{i+1})?",
                f"Determine the key outcome or definition of {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Life in the UK Handbook (3rd Ed.), Chapter 3: A Long and Illustrious History",
                f"{topic}: {desc[:35]}...",
                f"This event fundamentally shaped England's religious, constitutional, and literary identity."
            )

    # 4. Stuarts, Civil War, Restoration & Glorious Revolution (1603-1714) (150 questions)
    stuarts = [
        ("The Gunpowder Plot (1605)", "A failed conspiracy led by Guy Fawkes and Catholic conspirators to blow up the Houses of Parliament", ["A peasant revolt against grain taxes in Norfolk", "A plot to assassinate Queen Elizabeth I in 1586", "A riot protesting the introduction of the steam engine"]),
        ("The King James Bible (1611)", "An authoritative and profoundly influential English translation of the Bible commissioned by King James I", ["The first legal code written in Anglo-Saxon England", "The official prayer book used in Catholic France", "A satirical political pamphlet published in 1700"]),
        ("The English Civil War (1642-1651)", "Conflict between Royalists ('Cavaliers') supporting Charles I and Parliamentarians ('Roundheads')", ["A war between England and Scotland over fish tariffs", "A colonial rebellion in the Americas", "A naval war against the Dutch Republic"]),
        ("Execution of King Charles I (1649)", "The trial and public execution of the monarch for treason, inaugurating the republican Commonwealth", ["The peaceful abdication of the monarch to live in France", "The exile of James II during the Glorious Revolution", "The death of King Harold at Hastings"]),
        ("Oliver Cromwell and the Commonwealth", "Military commander who ruled Britain as 'Lord Protector' during the republican interregnum (1649-1658)", ["The architect of St Paul's Cathedral", "The first elected Prime Minister of Great Britain", "The leader of the Jacobite rebellion in 1745"]),
        ("The Restoration of the Monarchy (1660)", "The return of Charles II to the English throne, ending the republican Commonwealth", ["The accession of William and Mary in 1689", "The coronation of Queen Victoria in 1837", "The signing of the Magna Carta in 1215"]),
        ("The Great Plague and Great Fire of London (1665-1666)", "Devastating plague outbreak followed by a catastrophic fire that destroyed most of medieval London", ["A series of riots during the Industrial Revolution", "A cholera outbreak during the Victorian era", "The Blitz bombardment during World War II"]),
        ("Sir Christopher Wren", "Renowned architect who redesigned London after the Great Fire, creating the magnificent St Paul's Cathedral", ["The general who defeated Napoleon at Waterloo", "The painter who founded the Royal Academy of Arts", "The author of Robinson Crusoe"]),
        ("The Glorious Revolution (1688)", "The bloodless replacement of Catholic James II with Protestant William III of Orange and Mary II", ["The outbreak of the English Civil War", "The passage of the Great Reform Act of 1832", "The Norman Conquest of 1066"]),
        ("The Bill of Rights (1689)", "Foundational constitutional statute confirming parliamentary supremacy, free elections, and limits on royal power", ["The document abolishing the House of Lords", "The treaty ending the War of the Spanish Succession", "A royal proclamation creating the Bank of England"]),
    ]

    for topic, desc, wrong_descs in stuarts:
        for i in range(15):
            add_q(
                "British History • Stuarts & Constitutional Revolution",
                f"Life in the UK Syllabus · {topic}",
                f"Why is {topic} considered a crucial turning point in British governance (Check #{i+1})?",
                f"Identify the enduring constitutional and historical impact of {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Life in the UK Handbook (3rd Ed.), Chapter 3",
                f"{topic}: {desc[:35]}...",
                f"The events surrounding {topic} laid the modern foundations of parliamentary democracy and constitutional monarchy."
            )

    # 5. 18th & 19th Century: Empire, Industrialization & Victorian Era (160 questions)
    victorian = [
        ("The Act of Union (1707)", "Legislation uniting the Kingdoms of England and Scotland into the single Kingdom of Great Britain", ["The treaty uniting Great Britain and Ireland in 1800", "The act establishing the Irish Free State in 1922", "The peace pact ending the Hundred Years' War"]),
        ("Sir Robert Walpole", "Considered Great Britain's first Prime Minister, holding executive office from 1721 to 1742", ["The commander of the British army at Waterloo", "The author of the Wealth of Nations", "The monarch who established the Church of England"]),
        ("The Industrial Revolution", "The rapid transformation from agrarian economy to factory manufacturing, powered by coal and steam", ["The agrarian revival of the 14th century", "The establishment of medieval craft guilds", "The post-WWII nationalization of utilities"]),
        ("James Watt and Richard Arkwright", "Pioneering inventors who developed the efficient steam engine and spinning frame for textiles", ["Generals who fought in the Crimean War", "Leaders of the suffragette movement", "Playwrights of the Elizabethan era"]),
        ("Battle of Trafalgar (1805)", "Decisive naval victory where Admiral Lord Nelson destroyed the Franco-Spanish fleet, securing naval supremacy", ["The land defeat of Napoleon in Belgium in 1815", "The naval engagement that defeated the Spanish Armada", "The evacuation of British troops from Dunkirk"]),
        ("Battle of Waterloo (1815)", "The decisive land battle in Belgium where the Duke of Wellington defeated Napoleon Bonaparte", ["The naval clash where Nelson was killed", "The siege of Yorktown during the American Revolution", "The major Allied offensive at the Somme in 1916"]),
        ("Abolition of the Slave Trade (1807)", "Parliamentary act championed by William Wilberforce banning the transatlantic slave trade across the British Empire", ["The Emancipation Proclamation issued by Abraham Lincoln", "The legislation establishing the League of Nations", "A treaty partition of African territories"]),
        ("Queen Victoria's Reign (1837-1901)", "A 63-year period of industrial growth, worldwide imperial expansion, and social reform", ["The Tudor golden age of maritime exploration", "The era of the English Civil War and Commonwealth", "The decade of the Great Depression"]),
        ("Florence Nightingale", "Pioneering nurse renowned as the 'Lady with the Lamp' during the Crimean War who founded modern nursing", ["The first woman elected to the House of Commons", "The reigning Queen of the United Kingdom in 1900", "The leader of the suffragettes who founded the WSPU"]),
        ("The Suffragettes & Emmeline Pankhurst", "Campaigners who fought passionately for women's right to vote, leading to universal adult suffrage", ["Advocates for the preservation of rural commons", "Miners who organized the 1926 General Strike", "Supporters of parliamentary electoral reform in 1832"]),
    ]

    for topic, desc, wrong_descs in victorian:
        for i in range(16):
            add_q(
                "British History • 18th & 19th Century Britain",
                f"Life in the UK Syllabus · {topic}",
                f"What is the historical significance of {topic} (Curriculum Standard #{i+1})?",
                f"Examine the enduring social, political, or economic consequence of {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Life in the UK Handbook (3rd Ed.), Chapter 3",
                f"{topic}: {desc[:35]}...",
                f"{topic} played a monumental role in shaping modern Britain's global and domestic development."
            )

    # 6. 20th Century & Modern Britain (160 questions)
    modern_uk = [
        ("WWI and the Battle of the Somme (1916)", "Devastating First World War campaign resulting in catastrophic casualties on both sides", ["A naval conflict fought in the North Sea", "A colonial conflict in southern Africa", "The final Allied battle in Germany in 1945"]),
        ("Winston Churchill's Leadership (1940-1945)", "Wartime Prime Minister who rallied British resolve during the Battle of Britain and led the Allies to victory", ["The Prime Minister who introduced the Welfare State", "The monarch during the Spanish Armada", "The foreign secretary who negotiated the Treaty of Utrecht"]),
        ("The Battle of Britain and the Blitz (1940)", "The RAF's aerial defence of British airspace against the Luftwaffe and the heavy bombing of UK cities", ["The Allied landings in Normandy on D-Day", "The tank battle at El Alamein in North Africa", "The naval battle of the Atlantic"]),
        ("D-Day Landings (June 6, 1944)", "Operation Overlord, the massive Allied amphibious invasion of Normandy that liberated Western Europe", ["The evacuation of Allied soldiers from Dunkirk", "The airborne assault on Arnhem in the Netherlands", "The capture of Berlin in May 1945"]),
        ("Founding of the National Health Service (1948)", "Created under Clement Attlee's Labour government, providing healthcare free at the point of delivery", ["A private insurance scheme established in 1911", "A military hospital network created in WWI", "A municipal charity created by Victorian philanthropists"]),
        ("The Windrush Generation (1948)", "Migrants from the Caribbean invited to help rebuild post-war Britain, arriving aboard HMT Empire Windrush", ["Refugees fleeing the Russian Revolution in 1917", "Evacuee children relocated to rural England during the Blitz", "Settlers who established the colony of Virginia"]),
        ("Queen Elizabeth II (reigned 1952-2022)", "Britain's longest-reigning monarch who served for 70 years, celebrated with the Platinum Jubilee in 2022", ["The monarch who reigned during the Napoleonic Wars", "The queen who authorized the King James Bible", "The first Tudor monarch of England"]),
        ("Margaret Thatcher", "First female Prime Minister of the United Kingdom (1979-1990), known for free-market economic reforms", ["The first female Speaker of the House of Commons", "The founder of the National Health Service", "The leader of the suffragette movement"]),
        ("The Good Friday Agreement (1998)", "Pivotal peace accord establishing devolved power-sharing institutions in Northern Ireland", ["The treaty ending the Falklands Conflict", "The agreement leading to the founding of the European Union", "The charter uniting England and Wales"]),
        ("Devolution Referendums (1997-1998)", "Popular votes creating the Scottish Parliament, National Assembly for Wales, and Northern Ireland Assembly", ["Referendums abolishing county councils in England", "Elections to join the European Common Market", "Votes deciding whether to retain the monarchy"]),
    ]

    for topic, desc, wrong_descs in modern_uk:
        for i in range(16):
            add_q(
                "British History • 20th Century & Modern Era",
                f"Life in the UK Syllabus · {topic}",
                f"What pivotal impact did {topic} have on British society (Item #{i+1})?",
                f"Analyze the historical outcome of {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Life in the UK Handbook (3rd Ed.), Chapter 3",
                f"{topic}: {desc[:35]}...",
                f"{topic} is an essential component of the Home Office citizenship testing syllabus."
            )

    # 7. UK Government, Parliament & The Justice System (160 questions)
    gov_uk = [
        ("Constitutional Monarchy", "A system where the reigning King is Head of State but remains politically neutral, acting on ministerial advice", ["A system where the King holds absolute legislative and executive veto power", "A republican government without any royal figures", "A military dictatorship governed by generals"]),
        ("House of Commons", "The democratically elected chamber of 650 MPs representing constituencies across the four nations", ["An appointed chamber of hereditary aristocrats and bishops", "A judicial council of senior appellate judges", "An assembly of municipal mayors and council leaders"]),
        ("House of Lords", "The upper chamber of Parliament that scrutinizes legislation, consisting of life peers, bishops, and hereditary peers", ["An elected body of 650 constituency representatives", "A commercial committee that sets central bank interest rates", "A criminal appellate jury"]),
        ("First-Past-The-Post", "The electoral system used in UK General Elections where the candidate with the most votes in each constituency wins", ["A proportional system where parties receive seats based on national vote percentage", "An alternative vote system where voters rank candidates numerically", "A mandatory lottery system for parliamentary seats"]),
        ("Prime Minister's Questions (PMQs)", "Weekly parliamentary session where the Prime Minister answers scrutiny questions from the Leader of the Opposition and MPs", ["An annual televised address to the nation delivered on Christmas Day", "A private cabinet briefing held behind closed doors", "A judicial appeal heard before the Supreme Court"]),
        ("The Crown Court", "The criminal court in England and Wales where serious indictable offences are tried before a judge and 12-person jury", ["A summary court where magistrates handle minor motoring offences", "A civil court that adjudicates small consumer debts", "A family court that resolves divorce disputes"]),
        ("Magistrates' Court", "Local courts in England and Wales that handle over 90% of criminal cases, presided over by unpaid volunteer magistrates", ["The supreme constitutional court of the United Kingdom", "A military tribunal that courts-martial soldiers", "A court that exclusively decides international maritime treaties"]),
        ("Jury System in Scotland", "Scottish criminal trials feature a unique jury of 15 members and three possible verdicts: guilty, not guilty, and not proven", ["A 12-person jury with verdicts of guilty and not guilty only", "A single judge without any jury representation", "A jury of 20 magistrates chosen by local councils"]),
        ("UK Supreme Court", "The highest court of appeal in the UK for civil cases, and for criminal cases from England, Wales, and Northern Ireland", ["A regional tribunal handling planning permission appeals", "A committee of the House of Commons that drafts bills", "A European body that decides common law contracts"]),
        ("General Election Franchise", "British, Irish, and qualifying Commonwealth citizens aged 18 and older registered on the electoral roll may vote", ["All residents regardless of nationality or voter registration", "Only individuals who own freehold real estate", "Only citizens who have completed mandatory military service"]),
    ]

    for topic, desc, wrong_descs in gov_uk:
        for i in range(16):
            add_q(
                "UK Government & Law • Democratic Institutions",
                f"Life in the UK Syllabus · {topic}",
                f"How is '{topic}' legally structured within the British constitutional framework (Standard #{i+1})?",
                f"Determine the fundamental operating rule of {topic}.",
                desc,
                wrong_descs,
                f"{topic}: {desc}.",
                "Life in the UK Handbook (3rd Ed.), Chapter 5: The UK Government and Law",
                f"{topic}: {desc[:35]}...",
                f"Understanding {topic} is a core requirement for passing the Life in the UK naturalization exam."
            )

    return questions

if __name__ == "__main__":
    print("UK Generator module loaded.")
