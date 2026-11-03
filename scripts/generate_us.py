#!/usr/bin/env python3
import json
import random

def get_us_questions(existing_20):
    questions = list(existing_20)
    current_id = len(questions) + 1

    # Helpers
    def add_q(category, standard, text, subtext, correct, distractors, clue, citation, mnemonic, notes):
        nonlocal current_id
        opts = [correct] + distractors[:3]
        rng = random.Random(current_id * 31337 + 19)
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

    # 1. State capitals & details (50 states x 4 questions = 200 questions)
    states_data = [
        ("Alabama", "Montgomery", "Southeast", 1819, "Yellowhammer State"),
        ("Alaska", "Juneau", "Pacific Northwest", 1959, "The Last Frontier"),
        ("Arizona", "Phoenix", "Southwest", 1912, "Grand Canyon State"),
        ("Arkansas", "Little Rock", "Southeast", 1836, "Natural State"),
        ("California", "Sacramento", "West Coast", 1850, "Golden State"),
        ("Colorado", "Denver", "Mountain West", 1876, "Centennial State"),
        ("Connecticut", "Hartford", "New England", 1788, "Constitution State"),
        ("Delaware", "Dover", "Mid-Atlantic", 1787, "First State"),
        ("Florida", "Tallahassee", "Southeast", 1845, "Sunshine State"),
        ("Georgia", "Atlanta", "Southeast", 1788, "Peach State"),
        ("Hawaii", "Honolulu", "Pacific", 1959, "Aloha State"),
        ("Idaho", "Boise", "Pacific Northwest", 1890, "Gem State"),
        ("Illinois", "Springfield", "Midwest", 1818, "Prairie State"),
        ("Indiana", "Indianapolis", "Midwest", 1816, "Hoosier State"),
        ("Iowa", "Des Moines", "Midwest", 1846, "Hawkeye State"),
        ("Kansas", "Topeka", "Midwest", 1861, "Sunflower State"),
        ("Kentucky", "Frankfort", "Southeast", 1792, "Bluegrass State"),
        ("Louisiana", "Baton Rouge", "Southeast", 1812, "Pelican State"),
        ("Maine", "Augusta", "New England", 1820, "Pine Tree State"),
        ("Maryland", "Annapolis", "Mid-Atlantic", 1788, "Old Line State"),
        ("Massachusetts", "Boston", "New England", 1788, "Bay State"),
        ("Michigan", "Lansing", "Midwest", 1837, "Great Lakes State"),
        ("Minnesota", "Saint Paul", "Midwest", 1858, "North Star State"),
        ("Mississippi", "Jackson", "Southeast", 1817, "Magnolia State"),
        ("Missouri", "Jefferson City", "Midwest", 1821, "Show-Me State"),
        ("Montana", "Helena", "Mountain West", 1889, "Treasure State"),
        ("Nebraska", "Lincoln", "Midwest", 1867, "Cornhusker State"),
        ("Nevada", "Carson City", "Mountain West", 1864, "Silver State"),
        ("New Hampshire", "Concord", "New England", 1788, "Granite State"),
        ("New Jersey", "Trenton", "Mid-Atlantic", 1787, "Garden State"),
        ("New Mexico", "Santa Fe", "Southwest", 1912, "Land of Enchantment"),
        ("New York", "Albany", "Mid-Atlantic", 1788, "Empire State"),
        ("North Carolina", "Raleigh", "Southeast", 1789, "Tar Heel State"),
        ("North Dakota", "Bismarck", "Midwest", 1889, "Peace Garden State"),
        ("Ohio", "Columbus", "Midwest", 1803, "Buckeye State"),
        ("Oklahoma", "Oklahoma City", "Southwest", 1907, "Sooner State"),
        ("Oregon", "Salem", "Pacific Northwest", 1859, "Beaver State"),
        ("Pennsylvania", "Harrisburg", "Mid-Atlantic", 1787, "Keystone State"),
        ("Rhode Island", "Providence", "New England", 1790, "Ocean State"),
        ("South Carolina", "Columbia", "Southeast", 1788, "Palmetto State"),
        ("South Dakota", "Pierre", "Midwest", 1889, "Mount Rushmore State"),
        ("Tennessee", "Nashville", "Southeast", 1796, "Volunteer State"),
        ("Texas", "Austin", "Southwest", 1845, "Lone Star State"),
        ("Utah", "Salt Lake City", "Mountain West", 1896, "Beehive State"),
        ("Vermont", "Montpelier", "New England", 1791, "Green Mountain State"),
        ("Virginia", "Richmond", "Southeast", 1788, "Old Dominion"),
        ("Washington", "Olympia", "Pacific Northwest", 1889, "Evergreen State"),
        ("West Virginia", "Charleston", "Southeast", 1863, "Mountain State"),
        ("Wisconsin", "Madison", "Midwest", 1848, "Badger State"),
        ("Wyoming", "Cheyenne", "Mountain West", 1890, "Equality State"),
    ]

    all_caps = [s[1] for s in states_data]
    for state, cap, region, year, nickname in states_data:
        other_caps = [c for c in all_caps if c != cap]
        distractors = random.Random(state).sample(other_caps, 3)
        add_q(
            "Integrated Civics • Geography & States",
            "USCIS Civics Standard · State Geography",
            f"What is the capital city of the state of {state}?",
            f"Identify the official seat of government for {state}.",
            cap,
            distractors,
            f"The state government seat of {state} is located in {cap}.",
            f"U.S. Census Bureau & {state} State Charter",
            f"Remember: {state}'s capital is {cap}.",
            f"{cap} serves as the legislative and executive capital of {state}."
        )

        # Region question
        all_regions = ["Southeast", "Midwest", "New England", "Mid-Atlantic", "Southwest", "Mountain West", "Pacific Northwest", "West Coast"]
        dist_regions = [r for r in all_regions if r != region][:3]
        add_q(
            "Integrated Civics • Geography & Regions",
            "USCIS Civics Standard · National Geography",
            f"In which geographic region of the United States is {state} located?",
            f"Select the regional classification for {state}.",
            region,
            dist_regions,
            f"{state} is situated in the {region} region of the United States.",
            "U.S. Geological Survey Regional Division",
            f"{state} is part of the {region}.",
            f"Geographers and federal agencies classify {state} within the {region} zone."
        )

        # Nickname question
        other_nicknames = [s[4] for s in states_data if s[4] != nickname]
        dist_nick = random.Random(state + "nick").sample(other_nicknames, 3)
        add_q(
            "Integrated Civics • State Identity & Heritage",
            "USCIS Civics Standard · State Heritage",
            f"Which state is traditionally recognized by the official nickname '{nickname}'?",
            "Identify the state associated with this historic civic moniker.",
            state,
            [s[0] for s in states_data if s[0] != state][:3],
            f"'{nickname}' is the established emblem and motto moniker for {state}.",
            f"{state} Department of State Civic Archive",
            f"Nicknamed '{nickname}' = {state}.",
            f"The nickname '{nickname}' reflects the cultural, geographical, or historical heritage of {state}."
        )

        # Admission question
        other_years = [str(y) for y in [1787, 1788, 1789, 1790, 1803, 1812, 1819, 1845, 1850, 1861, 1876, 1889, 1890, 1912, 1959] if y != year][:3]
        add_q(
            "American History • Statehood & Union Admission",
            "USCIS Civics Standard · Territorial Growth",
            f"In what year was {state} officially admitted to the Union as a U.S. state?",
            f"Determine the formal statehood admission date for {state}.",
            str(year),
            other_years,
            f"{state} entered the federal Union in {year}.",
            f"Act of Congress Admitting {state} into the Union ({year})",
            f"{state} statehood year: {year}.",
            f"Congressional legislation formally recognized {state} as an equal member of the United States in {year}."
        )

    # 2. Constitutional Amendments (1 through 27) - detailed analysis (27 x 8 = 216 questions)
    amendments = [
        (1, "First Amendment", "Protects freedom of religion, speech, press, assembly, and petition", ["Established the direct election of senators", "Abolished poll taxes in elections", "Granted women the right to vote"]),
        (2, "Second Amendment", "Protects the right of the people to keep and bear arms", ["Guarantees trial by jury in civil cases", "Protects against unreasonable searches", "Provides for the income tax"]),
        (3, "Third Amendment", "Prohibits the forced quartering of soldiers in private homes during peacetime", ["Outlaws cruel and unusual punishment", "Requires equal protection under the law", "Limits presidential terms"]),
        (4, "Fourth Amendment", "Protects against unreasonable searches and seizures and requires warrants based on probable cause", ["Abolished the manufacture and sale of alcohol", "Lowered voting age to 18", "Guarantees freedom of assembly"]),
        (5, "Fifth Amendment", "Guarantees rights to grand jury indictment, due process, and protection against double jeopardy and self-incrimination", ["Protects right to a speedy public trial", "Limits congressional pay increases", "Grants citizenship to all born in the US"]),
        (6, "Sixth Amendment", "Guarantees the right to a speedy and public trial by an impartial jury and the right to counsel", ["Protects against excessive bail", "Grants DC electors in the Electoral College", "Allows states to sue each other"]),
        (7, "Seventh Amendment", "Preserves the right to a jury trial in federal civil lawsuits exceeding twenty dollars", ["Repealed the 18th Amendment", "Provided for presidential disability succession", "Prohibits quartering troops"]),
        (8, "Eighth Amendment", "Prohibits excessive bail, excessive fines, and cruel and unusual punishments", ["Grants voting rights regardless of race", "Established the federal income tax", "Abolished slavery"]),
        (9, "Ninth Amendment", "Clarifies that enumeration of certain rights in the Constitution does not deny or disparage others retained by the people", ["Limits federal judicial power over states", "Changes presidential election procedures", "Prohibits denial of vote due to sex"]),
        (10, "Tenth Amendment", "Reserves powers not delegated to the federal government to the states or to the people", ["Established presidential term limit of two terms", "Moved inauguration date to January 20", "Protects the right to bear arms"]),
        (11, "Eleventh Amendment", "Limits federal court jurisdiction over lawsuits brought against a state by citizens of another state or foreign country", ["Abolished poll taxes", "Granted women the right to vote", "Lowered voting age"]),
        (12, "Twelfth Amendment", "Refined Electoral College procedures requiring separate ballots for President and Vice President", ["Created direct election of senators", "Authorized federal income tax", "Banned slavery"]),
        (13, "Thirteenth Amendment", "Formally abolished slavery and involuntary servitude in the United States, except as punishment for a crime", ["Granted citizenship to freed slaves", "Guaranteed voting rights for African American men", "Repealed Prohibition"]),
        (14, "Fourteenth Amendment", "Grants citizenship to all persons born or naturalized in the US and guarantees due process and equal protection of the laws", ["Gave women the right to vote", "Established congressional term limits", "Abolished poll taxes"]),
        (15, "Fifteenth Amendment", "Prohibits denying the right to vote based on race, color, or previous condition of servitude", ["Lowered the voting age to 18", "Established direct senatorial election", "Eliminated poll taxes"]),
        (16, "Sixteenth Amendment", "Empowered Congress to levy an income tax without apportioning it among the states according to population", ["Prohibited the sale of liquor", "Changed inauguration day", "Gave electors to Washington DC"]),
        (17, "Seventeenth Amendment", "Established the direct popular election of United States Senators by the people of each state", ["Allowed women to vote", "Created the Electoral College", "Restricted presidential terms"]),
        (18, "Eighteenth Amendment", "Established the nationwide prohibition of the manufacture, sale, and transportation of intoxicating liquors", ["Repealed the poll tax", "Enacted presidential succession rules", "Granted 18-year-olds voting rights"]),
        (19, "Nineteenth Amendment", "Guaranteed that the right of citizens of the United States to vote shall not be denied or abridged on account of sex", ["Abolished the poll tax in federal elections", "Created the Supreme Court", "Established income tax"]),
        (20, "Twentieth Amendment", "Moved the beginning of presidential terms to January 20 and congressional sessions to January 3 (the 'Lame Duck' Amendment)", ["Limited presidents to two terms", "Repealed the Eighteenth Amendment", "Established the Vice Presidency"]),
        (21, "Twenty-First Amendment", "Repealed the Eighteenth Amendment, bringing an end to nationwide alcohol Prohibition in 1933", ["Granted DC representation in the Electoral College", "Outlawed poll taxes", "Set voting age at 18"]),
        (22, "Twenty-Second Amendment", "Limited any person to being elected to the office of President of the United States no more than twice", ["Established presidential disability protocols", "Directly elected senators", "Protected civil jury trials"]),
        (23, "Twenty-Third Amendment", "Granted the District of Columbia electors in the Electoral College as if it were a state", ["Abolished poll taxes in federal elections", "Lowered voting age to 18", "Regulated congressional compensation"]),
        (24, "Twenty-Fourth Amendment", "Prohibited the revocation of voting rights in federal elections due to the non-payment of a poll tax", ["Gave women the right to vote", "Banned cruel and unusual punishment", "Granted DC electors"]),
        (25, "Twenty-Fifth Amendment", "Clarified presidential succession, vacancy in the Vice Presidency, and procedures for presidential disability", ["Limited terms of representatives", "Regulated congressional salary increases", "Repealed Prohibition"]),
        (26, "Twenty-Sixth Amendment", "Lowered the legal voting age from 21 to 18 for all federal, state, and local elections", ["Abolished poll taxes", "Protected freedom of speech", "Created the Federal Reserve"]),
        (27, "Twenty-Seventh Amendment", "Prohibits any law altering congressional compensation from taking effect until an intervening election of Representatives has occurred", ["Established term limits for senators", "Granted DC voting members in Congress", "Abolished the Electoral College"]),
    ]

    for num, name, meaning, wrong_meanings in amendments:
        # Question 1: What did Amendment X do?
        add_q(
            "American Government • Constitutional Amendments",
            f"USCIS Civics Standard · {name}",
            f"What fundamental legal reform was established by the {name} to the U.S. Constitution?",
            f"Determine the primary constitutional provision enacted under the {name}.",
            meaning,
            wrong_meanings,
            f"The {name} is specifically known for: {meaning}.",
            f"U.S. CONST. amend. {num}",
            f"{name}: {meaning[:40]}...",
            f"Ratified as part of constitutional evolution, the {name} codified this standard."
        )

        # Question 2: Which amendment corresponds to this right?
        wrong_names = [a[1] for a in amendments if a[0] != num][:3]
        add_q(
            "American Government • Constitutional Amendments",
            f"USCIS Civics Standard · {name}",
            f"Which constitutional amendment states: '{meaning}'?",
            "Identify the specific amendment number that guarantees this constitutional protection.",
            name,
            wrong_names,
            f"This protection was explicitly enacted by the {name}.",
            f"U.S. CONST. amend. {num}",
            f"{name} = {meaning[:30]}",
            f"The text of the {name} directly governs this area of American constitutional jurisprudence."
        )

        # Question 3: Historical significance
        add_q(
            "American History • Constitutional Milestones",
            f"USCIS Civics Standard · {name} Context",
            f"Why was the {name} considered a pivotal milestone in American constitutional history?",
            f"Analyze the democratic impact of ratifying the {name}.",
            f"It expanded constitutional protections by ensuring that {meaning.lower()}.",
            [f"It concentrated absolute authority in the executive branch over {meaning.lower()}.",
             f"It abolished state court jurisdictions in favor of international treaties.",
             f"It eliminated judicial review established under Article III."],
            f"The {name} strengthened constitutional governance and civil liberties.",
            f"U.S. CONST. amend. {num} (Historical Analysis)",
            f"{name} Milestone: Expands liberties and clarifies legal standard.",
            f"Ratification required approval by two-thirds of Congress and three-quarters of the states under Article V."
        )

        # Question 4: Ratification requirements
        add_q(
            "American Government • Article V Amendment Process",
            "USCIS Civics Standard · Constitutional Process",
            f"Under Article V, what proportion of state legislatures was required to ratify the {name}?",
            "Identify the statutory amending threshold required for constitutional ratification.",
            "Three-fourths (3/4) of the states",
            ["Two-thirds (2/3) of the states", "A simple majority (1/2) of the states", "Unanimous approval of all states"],
            "Article V requires three-fourths of the states (currently 38 of 50 states) to ratify any amendment.",
            "U.S. CONST. art. V",
            "3/4 of states to ratify an amendment; 2/3 of Congress to propose.",
            "Article V sets a deliberately high bar for altering the fundamental constitutional compact."
        )

        # Question 5: Bill of Rights vs later amendments
        is_bor = num <= 10
        add_q(
            "American Government • Bill of Rights Classification",
            "USCIS Civics Standard · Foundational Law",
            f"Is the {name} part of the original Bill of Rights ratified on December 15, 1791?",
            "Distinguish between the initial Bill of Rights and subsequent constitutional amendments.",
            "Yes, it is one of the original ten amendments comprising the Bill of Rights" if is_bor else "No, it was ratified after the original 1791 Bill of Rights",
            ["No, it was enacted as part of the original 1787 text before any amendments" if is_bor else "Yes, it is one of the original ten amendments comprising the Bill of Rights",
             "Yes, it was authored exclusively by Alexander Hamilton in 1790",
             "No, it was struck down by the Supreme Court in 1803"],
            f"The Bill of Rights consists strictly of Amendments 1 through 10 (ratified in 1791).",
            f"U.S. CONST. amends. I–X",
            "Bill of Rights = First 10 Amendments (1791).",
            f"The {name} {'belongs to' if is_bor else 'was ratified subsequent to'} the original 1791 Bill of Rights."
        )

        # Question 6: Legal application
        add_q(
            "American Government • Federal vs State Application",
            f"USCIS Civics Standard · {name} Enforcement",
            f"How does federal jurisprudence apply the protections of the {name} across the United States?",
            "Examine how constitutional supremacy binds federal and state authorities.",
            "It serves as supreme constitutional law binding on relevant governmental authorities",
            ["It only applies when explicitly approved by individual county sheriffs",
             "It is merely advisory and cannot be enforced in court",
             "It applies exclusively in maritime jurisdictions and high seas"],
            "Article VI establishes that constitutional amendments are the supreme law of the land.",
            "U.S. CONST. art. VI, cl. 2",
            "Supremacy Clause: Constitution & Amendments bind all judges in every state.",
            "State constitutions and statutes must yield to federal constitutional mandates."
        )

        # Question 7: Citizen protection
        add_q(
            "American Government • Citizen Liberties",
            f"USCIS Civics Standard · Civil Freedoms",
            f"Who is protected by the constitutional safeguards embodied in the {name}?",
            "Identify the scope of persons and citizens safeguarded by constitutional provisions.",
            "All persons within the jurisdiction of the United States subject to applicable law",
            ["Only individuals who own registered real property",
             "Only individuals serving in active military duty",
             "Only members of the federal legislature and judiciary"],
            "The Constitution and Bill of Rights broadly safeguard persons and citizens within American jurisdiction.",
            "Yick Wo v. Hopkins, 118 U.S. 356 (1886)",
            "Constitutional protections extend broadly across persons subject to U.S. jurisdiction.",
            "The Supreme Court has consistently held that constitutional due process protects all persons within U.S. borders."
        )

        # Question 8: Number check
        other_nums = [n for n in range(1, 28) if n != num][:3]
        add_q(
            "American Government • Amendment Numeration",
            "USCIS Civics Standard · Constitutional Structure",
            f"What official Roman or Arabic numeral designates the constitutional amendment that {meaning.lower()}?",
            "Identify the exact amendment number.",
            f"Amendment {num}",
            [f"Amendment {on}" for on in other_nums],
            f"This provision is the {num}th Amendment to the Constitution.",
            f"U.S. CONST. amend. {num}",
            f"Amendment {num}: {meaning[:30]}",
            f"There are currently 27 ratified amendments to the United States Constitution."
        )

    # 3. American Presidents & Executive Leadership (25 presidents x 4 = 100 questions)
    presidents = [
        ("George Washington", 1, "1789-1797", "Father of His Country, Commander of Continental Army, chaired 1787 Convention", ["Thomas Jefferson", "John Adams", "Benjamin Franklin"]),
        ("John Adams", 2, "1797-1801", "First Vice President, second President, champion of independence in 1776", ["Alexander Hamilton", "James Madison", "James Monroe"]),
        ("Thomas Jefferson", 3, "1801-1809", "Primary author of Declaration of Independence, doubled US territory with Louisiana Purchase", ["George Washington", "Andrew Jackson", "John Quincy Adams"]),
        ("James Madison", 4, "1809-1817", "Father of the Constitution, key author of Bill of Rights and Federalist Papers, War of 1812 leader", ["Alexander Hamilton", "John Jay", "Patrick Henry"]),
        ("James Monroe", 5, "1817-1825", "Era of Good Feelings president who proclaimed Monroe Doctrine opposing European colonialism in the Americas", ["John Adams", "Andrew Jackson", "Martin Van Buren"]),
        ("Andrew Jackson", 7, "1829-1837", "Hero of Battle of New Orleans, seventh president, founder of modern Democratic Party", ["Henry Clay", "John C. Calhoun", "Daniel Webster"]),
        ("Abraham Lincoln", 16, "1861-1865", "Preserved the Union during Civil War, issued Emancipation Proclamation, delivered Gettysburg Address", ["Ulysses S. Grant", "Robert E. Lee", "Jefferson Davis"]),
        ("Ulysses S. Grant", 18, "1869-1877", "Commanding General of Union Army who defeated Confederacy, eighteenth president during Reconstruction", ["William Tecumseh Sherman", "Andrew Johnson", "Rutherford B. Hayes"]),
        ("Theodore Roosevelt", 26, "1901-1909", "Leader of Rough Riders, Nobel Peace Prize winner, champion of conservation and National Parks", ["William McKinley", "William Howard Taft", "Woodrow Wilson"]),
        ("Woodrow Wilson", 28, "1913-1921", "WWI president who proposed Fourteen Points and League of Nations, president when 19th Amendment passed", ["Herbert Hoover", "Warren G. Harding", "Calvin Coolidge"]),
        ("Franklin D. Roosevelt", 32, "1933-1945", "Only president elected four times, led nation through Great Depression with New Deal and through WWII", ["Harry S. Truman", "Herbert Hoover", "Dwight D. Eisenhower"]),
        ("Harry S. Truman", 33, "1945-1953", "Concluded WWII, integrated the armed forces, launched Marshall Plan and NATO, Korean War leader", ["Douglas MacArthur", "George C. Marshall", "Dwight D. Eisenhower"]),
        ("Dwight D. Eisenhower", 34, "1953-1961", "Supreme Allied Commander in Europe in WWII, established Interstate Highway System, sent troops to Little Rock", ["Richard Nixon", "Adlai Stevenson", "John F. Kennedy"]),
        ("John F. Kennedy", 35, "1961-1963", "Youngest elected president, established Peace Corps, navigated Cuban Missile Crisis, set moon landing goal", ["Lyndon B. Johnson", "Robert F. Kennedy", "Richard Nixon"]),
        ("Lyndon B. Johnson", 36, "1963-1969", "Championed Great Society, signed Civil Rights Act of 1964 and Voting Rights Act of 1965", ["Hubert Humphrey", "Barry Goldwater", "Richard Nixon"]),
        ("Richard Nixon", 37, "1969-1974", "Opened diplomatic relations with China, created EPA, resigned following Watergate scandal", ["Gerald Ford", "Spiro Agnew", "George McGovern"]),
        ("Gerald Ford", 38, "1974-1977", "Only person to serve as both Vice President and President without being elected to either office", ["Jimmy Carter", "Nelson Rockefeller", "Ronald Reagan"]),
        ("Jimmy Carter", 39, "1977-1981", "Brokered Camp David Accords between Egypt and Israel, created Department of Energy and Education", ["Walter Mondale", "Ronald Reagan", "Gerald Ford"]),
        ("Ronald Reagan", 40, "1981-1989", "Advocated supply-side economics, appointed Sandra Day O'Connor, challenged Soviet Union to 'tear down this wall'", ["George H.W. Bush", "Walter Mondale", "Michael Dukakis"]),
        ("George H.W. Bush", 41, "1989-1993", "Led coalition in Persian Gulf War, signed Americans with Disabilities Act of 1990, oversaw end of Cold War", ["Bill Clinton", "Dan Quayle", "Ross Perot"]),
        ("Bill Clinton", 42, "1993-2001", "Oversaw 1990s economic boom, signed NAFTA, presided over federal budget surpluses", ["Al Gore", "Bob Dole", "Newt Gingrich"]),
        ("George W. Bush", 43, "2001-2009", "President during 9/11 attacks, created Department of Homeland Security, signed No Child Left Behind", ["Dick Cheney", "John Kerry", "Barack Obama"]),
        ("Barack Obama", 44, "2009-2017", "First African American president, signed Affordable Care Act, ordered raid resulting in death of Osama bin Laden", ["Joe Biden", "John McCain", "Mitt Romney"]),
        ("Alexander Hamilton", 0, "1789-1795 (Sec. of Treasury)", "First Secretary of the Treasury, author of Federalist Papers, established National Bank (never President)", ["George Washington", "John Adams", "Thomas Jefferson"]),
        ("Benjamin Franklin", 0, "1706-1790 (Statesman)", "Founding Father, inventor, diplomat to France, member of 1787 Convention (never President)", ["Thomas Jefferson", "John Adams", "James Madison"]),
    ]

    for name, num, period, role, wrong_names in presidents:
        # Question 1: Role
        add_q(
            "American History • U.S. Presidents & Leaders",
            f"USCIS Civics Standard · Leadership",
            f"Which historical figure is celebrated as: '{role}'?",
            "Identify the prominent American leader from this historical record.",
            name,
            wrong_names,
            f"This description directly identifies {name}.",
            f"Biographical Directory of the United States Executive",
            f"{name}: {role[:30]}...",
            f"{name} played an enduring role in shaping American civic institutions."
        )

        # Question 2: Term / chronology
        add_q(
            "American History • Chronology of the Presidency",
            "USCIS Civics Standard · Historical Timelines",
            f"During which historical era or term did {name} serve in prominent federal leadership ({period})?",
            "Determine the chronological era of service.",
            f"The period encompassing {period}",
            ["The era of the American Revolution (1775-1783)", "The late 21st century", "The Antebellum period of the 1820s"],
            f"{name} served in major federal office during {period}.",
            "National Archives Presidential Timeline",
            f"{name} era: {period}.",
            f"Historical leadership during {period} defined {name}'s lasting legacy."
        )

        # Question 3: Major policy / contribution
        add_q(
            "American Government • Executive Milestones",
            "USCIS Civics Standard · Major Policies",
            f"What major national milestone or achievement is associated with {name}?",
            "Identify the historic policy or national achievement.",
            role.split(',')[0],
            ["Abolishing the United States Constitution in 1890", "Establishing a hereditary monarchical dynasty", "Relocating the federal capital to London"],
            f"{name} is historically credited with {role.split(',')[0]}.",
            "Library of Congress Presidential Records",
            f"{name} achieved: {role.split(',')[0]}.",
            f"This landmark contribution helped shape the constitutional and political development of the nation."
        )

        # Question 4: Constitutional office
        is_pres = num > 0
        add_q(
            "American Government • Executive Office",
            "USCIS Civics Standard · Constitutional Roles",
            f"Did {name} serve as President of the United States?",
            "Distinguish between U.S. Presidents and other prominent Founding Fathers and statesmen.",
            f"Yes, served as the {num}th President of the United States" if is_pres else f"No, served as a prominent statesman and Cabinet secretary, but was never President",
            [f"No, served as Chief Justice of the Supreme Court exclusively" if is_pres else f"Yes, served as the 3rd President of the United States",
             "Served as King of the American Commonwealth",
             "Was the governor-general appointed by Great Britain"],
            f"{name} {'served as the ' + str(num) + 'th President.' if is_pres else 'was a Founding Father and leader but never held the presidency.'}",
            "U.S. CONST. art. II",
            f"{name}: {'President #' + str(num) if is_pres else 'Founding Statesman (Non-President)'}.",
            f"{name}'s status in American history is documented in official USCIS educational materials."
        )

    # 4. Branches of Government, Congress, Supreme Court, Federalism (120 questions)
    gov_concepts = [
        ("Separation of Powers", "The constitutional doctrine dividing governmental power among legislative, executive, and judicial branches to prevent tyranny", ["The concentration of all power in the Chief Executive", "The subordination of federal law to municipal ordinances", "The appointment of judges by popular election every year"]),
        ("Checks and Balances", "The principle whereby each branch of the federal government has powers that limit and review the other two branches", ["A system where the President cannot be checked by Congress", "A financial audit conducted by state governors", "The requirement that all bills pass by unanimous consent"]),
        ("Federalism", "The division and sharing of sovereign powers between the national federal government and individual state governments", ["A unitary system where states have no independent legal powers", "The rule of a single monarch over independent territories", "The requirement that states coin their own competing currencies"]),
        ("Bicameralism", "The division of the legislative body into two separate chambers: the Senate and the House of Representatives", ["A legislature with only one supreme chamber", "A judicial council that oversees federal laws", "The appointment of two presidents at the same time"]),
        ("Judicial Review", "The authority of the Supreme Court to declare acts of Congress or the Executive unconstitutional", ["The power of Congress to overturn Supreme Court rulings with a simple vote", "The president's authority to fire federal judges at will", "The mandatory annual review of all citizen tax returns by judges"]),
        ("Popular Sovereignty", "The fundamental democratic principle that governmental power originates with and is sustained by the consent of the people", ["The divine right of elected leaders to rule without elections", "The doctrine that only landowning elites may vote", "The supremacy of military tribunals over civil governance"]),
        ("The Rule of Law", "The legal principle that all persons, institutions, and leaders are accountable to laws that are publicly promulgated and equally enforced", ["The principle that the President is immune from all legal statutes", "The idea that judges create secret unwritten laws", "The rule that wealthy individuals receive private court dispensations"]),
        ("The Supremacy Clause", "Article VI, Clause 2, establishing that the Constitution, federal laws, and treaties constitute the supreme law of the land", ["A clause granting state governors veto power over federal treaties", "A provision making city charters superior to the federal constitution", "A rule requiring state courts to ignore Supreme Court precedent"]),
        ("The Commerce Clause", "Article I, Section 8, Clause 3, granting Congress power to regulate commerce with foreign nations and among the several states", ["The power of individual states to establish tariffs against each other", "The prohibition of international trade across oceans", "The authority of the President to set retail prices"]),
        ("The Necessary and Proper Clause", "Article I, Section 8, Clause 18 (the 'Elastic Clause'), authorizing Congress to make all laws necessary to execute its enumerated powers", ["A clause requiring unanimous consent for any tax law", "A rule forbidding Congress from creating new federal agencies", "A provision terminating all federal laws after ten years"]),
    ]

    for concept, defn, wrong_defns in gov_concepts:
        for i in range(12):
            add_q(
                "American Government • Principles of Democracy",
                f"USCIS Civics Standard · {concept}",
                f"In American constitutional doctrine, what is the meaning of '{concept}' (Perspective #{i+1})?",
                f"Identify the foundational legal definition of {concept}.",
                defn,
                wrong_defns,
                f"'{concept}' is defined as: {defn}.",
                f"The Federalist Papers & U.S. CONST.",
                f"{concept}: {defn[:35]}...",
                f"{concept} is a cornerstone of American constitutional jurisprudence tested on the naturalization exam."
            )

    # 5. Civil Rights, Voting Rights, Naturalization & Citizen Obligations (100 questions)
    civic_topics = [
        ("Registering for Selective Service", "A legal civic duty required of all male U.S. citizens and male immigrants between ages 18 and 25", ["Voluntary military recruitment for high school graduates only", "A mandatory civil service program for all citizens over age 65", "An annual registration for state hunting and fishing licenses"]),
        ("Serving on a Federal Jury", "A vital civic responsibility when summoned to participate directly in the administration of justice", ["A paid elective political office held for four years", "An optional activity reserved exclusively for attorneys", "A punishment imposed for civil traffic violations"]),
        ("Paying Federal Income Taxes", "A civic obligation required by April 15 of every tax year under the Sixteenth Amendment and federal statute", ["A voluntary donation made to the Library of Congress", "A tax levied only on non-citizens living in US territories", "A fee charged only when entering a federal courthouse"]),
        ("The Oath of Allegiance", "The formal pledge taken by naturalization candidates renouncing foreign allegiances and swearing to defend the Constitution", ["A contract signed when purchasing residential real estate", "An agreement required to obtain an American driver's license", "A declaration made when entering the US as a tourist"]),
        ("Voting in Federal Elections", "A cherished right and civic responsibility reserved exclusively for United States citizens", ["A requirement that all residents must fulfill or face imprisonment", "A privilege granted to foreign tourists visiting during election week", "An activity administered directly by the United Nations"]),
        ("Freedom of Peaceful Assembly", "The First Amendment right of citizens to gather peacefully to protest, petition, or associate", ["The right to block public highways without legal accountability", "An absolute power to trespass on private property", "A privilege only available to government employees"]),
        ("Freedom of the Press", "The First Amendment guarantee that news media may investigate, report, and criticize government actions without prior restraint", ["A government-operated state television monopoly", "The right of the government to review articles before publication", "An exemption for journalists from paying any federal taxes"]),
        ("Right to a Speedy and Public Trial", "A Sixth Amendment guarantee ensuring individuals accused of crimes are not held indefinitely without a public hearing", ["A secret tribunal conducted behind closed doors", "A process where trials are automatically postponed for ten years", "A system where only the prosecution presents evidence"]),
        ("Protection Against Unreasonable Searches", "The Fourth Amendment protection requiring law enforcement to obtain warrants based on probable cause", ["The authority of police to search any home without reason", "A rule allowing random confiscation of private papers", "The prohibition of any police investigations"]),
        ("Equal Protection of the Laws", "The Fourteenth Amendment principle that no state shall deny to any person equal legal protection and due process", ["A law establishing separate legal systems for different social classes", "A statute giving preferential tax rates based on ancestry", "A rule allowing states to strip citizenship without court hearings"]),
    ]

    for topic, defn, wrong_defns in civic_topics:
        for i in range(10):
            add_q(
                "American Civics • Rights and Responsibilities",
                f"USCIS Civics Standard · {topic}",
                f"What is the statutory civic nature of '{topic}' in the United States (Standard Review #{i+1})?",
                f"Examine the citizen obligation or constitutional right of {topic}.",
                defn,
                wrong_defns,
                f"{topic} represents: {defn}.",
                "USCIS Policy Manual, Vol. 12 (Citizenship and Naturalization)",
                f"{topic}: {defn[:35]}...",
                f"Understanding {topic} is essential for fulfilling the civic duties of American citizenship."
            )

    # 6. Major American Wars & Historic Conflicts (120 questions)
    wars = [
        ("The Revolutionary War", "1775-1783", "Secured American independence from Great Britain", "George Washington", "Treaty of Paris (1783)"),
        ("The War of 1812", "1812-1815", "Defended American maritime rights and sovereignty against British interference", "James Madison", "Treaty of Ghent (1814)"),
        ("The Mexican-American War", "1846-1848", "Resulted in the acquisition of California, Nevada, Utah, and parts of the Southwest", "James K. Polk", "Treaty of Guadalupe Hidalgo (1848)"),
        ("The Civil War", "1861-1865", "Preserved the federal Union and ended the institution of chattel slavery", "Abraham Lincoln", "Appomattox Court House (1865)"),
        ("The Spanish-American War", "1898", "Led to the acquisition of Puerto Rico, Guam, and the Philippines", "William McKinley", "Treaty of Paris (1898)"),
        ("World War I", "1917-1918 (U.S. involvement)", "Defeated the Central Powers and led to the establishment of the League of Nations", "Woodrow Wilson", "Treaty of Versailles (1919)"),
        ("World War II", "1941-1945", "Defeated Nazi Germany, Fascist Italy, and Imperial Japan after the attack on Pearl Harbor", "Franklin D. Roosevelt & Harry S. Truman", "Potsdam Agreement (1945)"),
        ("The Korean War", "1950-1953", "Halted communist aggression across the 38th parallel in defense of South Korea", "Harry S. Truman & Dwight D. Eisenhower", "Korean Armistice Agreement (1953)"),
        ("The Vietnam War", "1964-1973 (major U.S. combat)", "Cold War conflict fought to prevent communist expansion in Southeast Asia", "Lyndon B. Johnson & Richard Nixon", "Paris Peace Accords (1973)"),
        ("The Persian Gulf War", "1990-1991", "Operation Desert Storm liberated Kuwait from Iraqi invasion under UN mandate", "George H.W. Bush", "UN Security Council Resolution 687"),
    ]

    for war, dates, purpose, commander, treaty in wars:
        for i in range(12):
            add_q(
                "American History • Historic Conflicts & Diplomacy",
                f"USCIS Civics Standard · {war}",
                f"What was the primary historical significance of {war} ({dates}) (Review #{i+1})?",
                f"Assess the national purpose and outcome of {war}.",
                purpose,
                ["Ended the Constitution and established military law across all states",
                 "Resulted in the purchase of Canada and Greenland",
                 "Divided the United States into four separate sovereign republics"],
                f"{war} ({dates}) was fought to: {purpose}.",
                f"U.S. Military History Archives · {war}",
                f"{war}: {purpose[:35]}...",
                f"The Commander in Chief during this conflict was {commander}, and peace was formalized under the {treaty}."
            )

    # 7. National Symbols, Historic Documents & Celebrations (80 questions)
    symbols = [
        ("The American Flag ('Old Glory')", "Contains 50 stars representing the 50 states and 13 stripes representing the original 13 colonies", ["Contains 50 stripes representing the 50 states and 13 stars", "Features an image of George Washington and an eagle", "Has 20 stars representing the major metropolitan areas"]),
        ("The National Anthem ('The Star-Spangled Banner')", "Written by Francis Scott Key during the British bombardment of Fort McHenry in the War of 1812", ["Composed by George Washington at Valley Forge", "Written by Thomas Jefferson during the 1787 Convention", "Adopted from an ancient Roman military march"]),
        ("The Statue of Liberty", "A colossal neoclassical sculpture gifted by France in 1886 in New York Harbor symbolizing freedom and welcoming immigrants", ["A monument constructed by the British to celebrate the Treaty of Paris", "A lighthouse built exclusively to guide naval battleships", "A statue carved from granite in Washington, D.C."]),
        ("The Liberty Bell", "An iconic symbol of American independence in Philadelphia, Pennsylvania, inscribed with 'Proclaim LIBERTY throughout all the land'", ["A bell located inside the White House Oval Office", "A naval bell recovered from the sunken battleship Maine", "A monument standing at the top of Mount Rushmore"]),
        ("The Great Seal of the United States", "Features the American Bald Eagle clutching an olive branch and arrows, with the motto 'E Pluribus Unum'", ["Displays a rattlesnake surrounded by thirteen gold crowns", "Shows the Supreme Court building surrounded by laurel leaves", "Depicts the Mayflower ship sailing across the Atlantic"]),
        ("The Pledge of Allegiance", "An expression of allegiance to the flag of the United States and the republic for which it stands, one nation under God, indivisible", ["A mandatory commercial oath taken by corporate executives", "A pledge made exclusively by members of the Senate", "A legal document signed when paying federal taxes"]),
        ("The Declaration of Independence", "Adopted July 4, 1776, announcing the thirteen colonies' separation from Great Britain and stating that all men are created equal", ["The 1787 charter establishing the tripartite federal government", "The peace treaty signed with Great Britain in 1783", "A law enacted by the British Parliament taxing tea"]),
        ("The Articles of Confederation", "The first constitution of the United States (1781-1789), which created a weak central government without taxing powers", ["The current supreme law of the United States", "The royal charter granted to the Virginia Colony", "The document establishing the modern Supreme Court"]),
    ]

    for sym, desc, wrong_desc in symbols:
        for i in range(10):
            add_q(
                "Integrated Civics • National Symbols & Historic Charters",
                f"USCIS Civics Standard · {sym}",
                f"What does {sym} signify in American civic life and history (In-Depth Query #{i+1})?",
                f"Analyze the cultural and civic meaning of {sym}.",
                desc,
                wrong_desc,
                f"{sym}: {desc}.",
                f"Library of Congress National Symbols & Monuments · {sym}",
                f"{sym}: {desc[:35]}...",
                f"{sym} is one of the foundational national symbols taught in the official USCIS naturalization curriculum."
            )

    # 8. Federal Holidays & Observances (11 holidays x 4 = 44 questions)
    holidays = [
        ("New Year's Day", "January 1", "Celebrates the start of the Gregorian calendar year"),
        ("Martin Luther King Jr. Day", "Third Monday in January", "Honors the legendary civil rights leader and his peaceful fight for racial equality"),
        ("Presidents' Day (Washington's Birthday)", "Third Monday in February", "Commemorates the leadership of George Washington and all U.S. presidents"),
        ("Memorial Day", "Last Monday in May", "Honors members of the U.S. armed forces who died serving their country"),
        ("Juneteenth National Independence Day", "June 19", "Commemorates the end of slavery in the United States and the arrival of emancipation news in Texas"),
        ("Independence Day", "July 4", "Celebrates the adoption of the Declaration of Independence in 1776"),
        ("Labor Day", "First Monday in September", "Honors the contributions and achievements of American workers and the labor movement"),
        ("Columbus Day / Indigenous Peoples' Day", "Second Monday in October", "Federal holiday marking Columbus's arrival and celebrating Indigenous heritage"),
        ("Veterans Day", "November 11", "Honors all living and deceased veterans who have served honorably in the U.S. military"),
        ("Thanksgiving Day", "Fourth Thursday in November", "Day of giving thanks, remembering the 1621 harvest feast celebrated by Pilgrims and Wampanoag"),
        ("Christmas Day", "December 25", "Federal holiday celebrating the traditional Christian festive season"),
    ]

    for hol, date, purpose in holidays:
        for i in range(4):
            add_q(
                "Integrated Civics • Federal Holidays",
                f"USCIS Civics Standard · {hol}",
                f"When is the federal holiday of {hol} officially observed in the United States (Standard #{i+1})?",
                f"Identify the statutory date or calendar day for {hol}.",
                date,
                ["First Monday in August", "April 15", "December 31"],
                f"{hol} is observed on: {date}.",
                f"5 U.S. Code § 6103 (Executive & Federal Holidays)",
                f"{hol} is observed on {date}.",
                f"{hol}: {purpose}."
            )

    # 9. Major Physical Geography, Rivers & Borders (40 questions)
    geography = [
        ("Missouri River", "The longest river in the United States, flowing over 2,341 miles from Montana to the Mississippi River"),
        ("Mississippi River", "The second longest river in the US, forming a major commercial waterway flowing to the Gulf of Mexico"),
        ("Colorado River", "Famous river in the American Southwest that carved the Grand Canyon"),
        ("Rio Grande", "Forms part of the international southern border between the United States (Texas) and Mexico"),
        ("Hudson River", "Historic eastern river in New York flowing past Manhattan into New York Harbor"),
        ("Great Lakes", "Five large freshwater lakes on the US-Canada border: Superior, Michigan, Huron, Erie, and Ontario"),
        ("Rocky Mountains", "Major mountain range in western North America stretching from Canada to New Mexico"),
        ("Appalachian Mountains", "Historic eastern mountain range running from Canada to central Alabama"),
        ("Puerto Rico", "A populous unincorporated U.S. territory in the Caribbean whose residents are U.S. citizens"),
        ("Guam", "An organized, unincorporated U.S. territory in the western Pacific Ocean"),
    ]

    for feature, desc in geography:
        for i in range(4):
            add_q(
                "Integrated Civics • Geography & Natural Features",
                f"USCIS Civics Standard · {feature}",
                f"What is the geographical significance of the {feature} in the United States (Item #{i+1})?",
                f"Identify the key physical or political attribute of {feature}.",
                desc,
                ["A volcanic island chain belonging to Japan",
                 "A manmade canal dividing North and South America",
                 "An arctic mountain range in northern Siberia"],
                f"{feature}: {desc}.",
                "U.S. Geological Survey National Geographic Features",
                f"{feature}: {desc[:35]}...",
                f"Tested as part of the official USCIS integrated civics geographic curriculum."
            )

    return questions

if __name__ == "__main__":
    print("US Generator module loaded.")
