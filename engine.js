// Nation Builder — shared content and rules.
// Both index.html and retro.html load this. It reads and writes the global `state`
// that each page declares; everything here is presentation-free.

// ═══════════════════════════════════════════════════════════
// NATIONS — tags drive geography-specific notes, effects and crises
// ═══════════════════════════════════════════════════════════
const NATIONS = [
  { name:"Valdoria", desc:"A coastal republic at the edge of the known world", icon:"coastal", tags:["coastal"],
    base:{pros:55,eq:50,inc:50,leg:50,inst:50,coh:50},
    geo:{Terrain:"Coastal plains, northern highlands",Climate:"Temperate, wet winters",Resources:"Timber, fish, iron ore",Neighbors:"Two larger powers to the east",Population:"~4 million"} },
  { name:"Kemrath", desc:"A landlocked nation of river valleys and dense forest", icon:"landlocked", tags:["landlocked","river"],
    base:{pros:45,eq:50,inc:50,leg:50,inst:50,coh:55},
    geo:{Terrain:"River valleys, dense forest",Climate:"Cold winters, short summers",Resources:"Fertile farmland, coal",Neighbors:"Three rival states on all sides",Population:"~900,000"} },
  { name:"Suranel", desc:"An arid plateau nation commanding vital trade routes", icon:"arid", tags:["arid","coastal"],
    base:{pros:55,eq:45,inc:50,leg:50,inst:50,coh:50},
    geo:{Terrain:"Arid plateau, one great river",Climate:"Hot and dry, scarce rain",Resources:"Rare minerals, trade routes",Neighbors:"Desert south, ocean west",Population:"~12 million"} },
  { name:"Thovara", desc:"An island nation of volcanic soil and tropical storms", icon:"island", tags:["island","coastal"],
    base:{pros:45,eq:50,inc:50,leg:50,inst:50,coh:60},
    geo:{Terrain:"Archipelago, volcanic soil",Climate:"Tropical, hurricane season",Resources:"Rich agriculture, no fuel",Neighbors:"Nearest nation 400 miles off",Population:"~600,000"} },
  { name:"Meralden", desc:"A vast interior nation of plains and great rivers", icon:"plains", tags:["plains","landlocked","river"],
    base:{pros:55,eq:50,inc:50,leg:50,inst:50,coh:45},
    geo:{Terrain:"Interior plains, great rivers",Climate:"Continental, extreme seasons",Resources:"Abundant grain, little timber",Neighbors:"Open borders on all sides",Population:"~8 million"} }
];

// ═══════════════════════════════════════════════════════════
// FAMILIES — text uses role tokens so any family fits any line
// {F}{M}{S}{D} first names · {fam} surname · [[landed||landless]]
// ═══════════════════════════════════════════════════════════
const FAMILIES = [
  { surname:"Vael", landed:true, sonSoldier:false,
    Fhold:"the six acres", Mwork:"delivered half the valley's children", MworkNow:"delivers the valley's children", Swork:"the joinery yards",
    dHigh:"is the first woman to sit on the regional council",
    dMid:"is clerk to the regional council. She drafts the laws; men sign them",
    dLow:"sews for a living, and is good at it. At night she reads whatever she can borrow",
    members:[
      {name:"Aldric",role:"Father — farmer & elder",age:42,desc:"Cleared his six acres with his own hands. Believes in order, fair dealing, and church on Sunday."},
      {name:"Maret",role:"Mother — midwife & trader",age:38,desc:"Delivers half the children in the valley and keeps the household accounts. Trusts no one who hasn't given her reason to."},
      {name:"Jorin",role:"Son — apprentice carpenter",age:17,desc:"Quick with numbers. Wants to build things. Wonders why the people who decide things never look like him."},
      {name:"Sele",role:"Daughter — learning her letters",age:9,desc:"Sharp and curious. The first in the family who might get an education, if the founders decide she deserves one."}]},
  { surname:"Ossian", landed:true, sonSoldier:true,
    Fhold:"the forge", Mwork:"kept the inn", MworkNow:"keeps the inn", Swork:"the iron foundry",
    dHigh:"is a physician, trained at the national college in the first decade it admitted women",
    dMid:"is a physician. She trained abroad because the college here would not take her, and came back anyway. She charges what people can pay",
    dLow:"is the best nurse in the district. Doctors half her age call her \"the girl\" and take her advice without admitting it",
    members:[
      {name:"Bren",role:"Father — blacksmith & councilman",age:50,desc:"His forge is the centre of the village. Opinions on everything, usually right. Distrusts men who've never worked with their hands."},
      {name:"Calla",role:"Mother — innkeeper",age:44,desc:"Hears every rumour before it's news. Extends credit to people who need it. Has never been repaid in full and keeps doing it."},
      {name:"Fen",role:"Son — returned soldier",age:22,desc:"Saw things in the war he doesn't talk about. Was promised land for his service. Is waiting to see if the promise holds."},
      {name:"Nira",role:"Daughter — wants to be a physician",age:15,desc:"Has read every book in the valley. Has been told twice that her kind of learning isn't proper for a girl. Is not deterred."}]},
  { surname:"Tarn", landed:false, sonSoldier:false,
    Fhold:"the leased field", Mwork:"taught children in her front room", MworkNow:"teaches in her front room", Swork:"the docks",
    dHigh:"is headmistress of the normal school in the capital, which trains every teacher in the nation",
    dMid:"teaches at the valley school — a real one, with a roof and a salary",
    dLow:"teaches twelve children in her front room, unpaid, as her mother did",
    members:[
      {name:"Edvin",role:"Father — tenant farmer",age:38,desc:"Works land he doesn't own. Pays the lease on time. Dreams of owning forty acres before he dies, and tries not to think about the alternative."},
      {name:"Rue",role:"Mother — seamstress & teacher",age:35,desc:"Teaches twelve children in her front room. Unpaid. Does it because someone has to."},
      {name:"Cael",role:"Son — dock worker",age:19,desc:"Works the river docks. Strong and restless. Has started attending meetings where men talk about rights."},
      {name:"Wren",role:"Daughter — helps her mother teach",age:11,desc:"Already ahead of her mother's students. Will be a teacher herself — or something more, if the nation allows it."}]}
];

// ═══════════════════════════════════════════════════════════
// METERS — hidden during the founding, revealed in interludes
// ═══════════════════════════════════════════════════════════
const METERS = [
  {k:"pros", n:"Prosperity",   w:["Hungry","Getting by","Comfortable","Prosperous"]},
  {k:"eq",   n:"Equality",     w:["Steeply divided","Unequal","Uneven but open","Broadly shared"]},
  {k:"inc",  n:"Belonging",    w:["Most are outside","Many are outside","Most are inside","Nearly all belong"]},
  {k:"leg",  n:"Legitimacy",   w:["Resented","Tolerated","Accepted","Trusted"]},
  {k:"inst", n:"Institutions", w:["Brittle","Personal","Functioning","Sturdy"]},
  {k:"coh",  n:"Cohesion",     w:["Fractured","Restless","Holding","United"]}
];
const word = (meter,v) => meter.w[v<35?0:v<50?1:v<65?2:3];

// ═══════════════════════════════════════════════════════════
// FOUNDING QUESTIONS
// choice: l label · c cost · fi family impact · x echo (what it sets in motion)
//         s summary phrase · e meter effects · g geo-tag effects · f flags
// ═══════════════════════════════════════════════════════════
const QUESTIONS = [
  { cat:"Power", icon:"power", title:"Who holds governing authority?",
    ctx:"The old rulers are gone. The question is not whether someone will hold power — it is who, and how they get it.",
    geo:{landlocked:"Surrounded by rivals, {nation} will need to decide quickly when the neighbours move. Slow consensus is a luxury of the protected.", island:"Four hundred miles of water stand between {nation} and anyone who would invade it. You can afford to be slow.", coastal:"Foreign ships will test whoever answers for {nation} in its ports."},
    witness:{r:"F", q:"I have worked twenty years in this valley. I have a right to say who governs it. But I know men who've worked longer and will never be asked."},
    choices:[
      {l:"An elected assembly — property owners vote", c:"Broad legitimacy, slow decisions. 'Property owners' already excludes someone. That exclusion calcifies.",
       fi:"[[{F} qualifies; the deed is in his name. {M} does not, though her accounts paid for half of it. She will never say this aloud.||{F} leases his land, so he cannot vote. Neither can anyone at his table.]]",
       x:"A vote that stops at the property line. The people outside it will one day walk to the capital to ask why.",
       s:"governed by an assembly elected by property owners", e:{leg:5,inc:-10,inst:5}, f:["propertyVote"]},
      {l:"A council of founders, selected by merit", c:"Wise and efficient — until founders age and their children inherit the seats. Merit becomes dynasty within two generations.",
       fi:"{F} is respected enough to be named to a district council. His children will inherit his standing, not earn it — and so will everyone else's.",
       x:"Founders die. When they do, someone will claim their seats by birth.",
       s:"governed by a council of founders", e:{inst:5,leg:-5,eq:-5}, f:["councilDynasty"]},
      {l:"A strong executive with an advisory body", c:"Clear leadership in crisis. The question is not whether this person is trustworthy. It is whether the office will be, after they are gone.",
       fi:"The {fam} family has no seat at this table. They will be governed, not governing.",
       x:"The office will outlive its first holder. The question of who holds it next will arrive on its own schedule.",
       s:"led by a strong executive", e:{coh:10,inst:-5}, g:{landlocked:{coh:5,leg:5}}, f:["executive"]},
      {l:"Federated regions — united only against outside threats", c:"Resilience and local control. Coordination fails exactly when you need it most: in the crisis that crosses regional lines.",
       fi:"The valley gets a say in its own affairs. What happens two provinces over is someone else's problem — until it isn't.",
       x:"Provinces with opposite interests will have to agree on trade. They will not agree easily.",
       s:"organised as a federation of regions", e:{coh:-10,leg:5}, g:{landlocked:{coh:-5}}, f:["federation"]}
    ]},
  { cat:"Economy", icon:"economy", title:"Who owns the land and its resources?",
    ctx:"Who owns the land determines who has leverage over everything else. This decision echoes for centuries.",
    geo:{arid:"On the plateau, owning land means little. Owning water means everything.", island:"There is only so much island. Whatever you decide, no one is making more of it.", plains:"The plains seem endless. They are not; the good river-bottom land is already spoken for."},
    witness:{r:"M", q:"I've kept this household fed through three bad harvests. Land means you eat when other people don't."},
    choices:[
      {l:"Private ownership — claim it, work it, own it", c:"Rapid development. Wealth concentrates within a generation. Those who arrive first — or with capital — own the future.",
       fi:"[[{F} owns {Fhold} free and clear. His tenant neighbour never will. Both work just as hard.||{F} works land he will never own unless he can buy it — and the price rises every year.]]",
       x:"Wealth concentrates. Every hard year will test who keeps their land.",
       s:"its land privately owned", e:{pros:15,eq:-15}, f:["privateLand"]},
      {l:"Common land; private ownership of what you produce", c:"Broad access to opportunity. Requires collective agreement about land use — which requires governance you may not yet have.",
       fi:"The family keeps what it grows. The land itself belongs to everyone, which means the meetings about it never end.",
       x:"Equal access, if the nation can govern it fairly. [[{F}||Even {F}, who leases,]] will have a field to work.",
       s:"its land held in common", e:{eq:10,pros:-5,inst:-5}, f:["commonLand","F_ownsLand"]},
      {l:"State owns key resources; private enterprise for the rest", c:"Strong government revenue. Whoever controls the state now controls the national wealth. Prizes attract predators.",
       fi:"The timber beyond {F}'s fence belongs to the nation. He can apply to harvest it. Applications take two years.",
       x:"The nation's wealth becomes a prize, and some men will want it badly.",
       s:"its key resources owned by the state", e:{pros:5,inst:-5}, f:["stateResources"]},
      {l:"No formal system — let it develop organically", c:"Flexibility now. Without rules, the strongest actors write the rules later. In their own favour. Every time.",
       fi:"Whoever has the most men and the most urgency will decide what the rules are. {F} hopes that man is reasonable.",
       x:"Someone will arrive to write the rules for you — with surveyors, and rifles.",
       s:"its land left without formal rules", e:{pros:5,eq:-10,inst:-15}, f:["noLandRules"]}
    ]},
  { cat:"Rights", icon:"rights", title:"What does your founding document promise every person?",
    ctx:"You are writing words that will outlast everyone in this room. They will be quoted, contested and used as weapons by both sides of every argument the nation ever has.",
    witness:{r:"S", q:"The men at the meeting say if we don't write it down, it doesn't exist. I think they're right."},
    choices:[
      {l:"Property, contract, and protection from seizure", c:"Commerce flourishes. Rights that protect what you own do not protect people who own nothing.",
       fi:"[[{F}'s property is protected.||{F}'s landlord's property is protected.]] {M}'s labour is not. {S}'s future is only as safe as what he will one day own.",
       x:"Holdings are safe. Voices are not addressed.",
       s:"a constitution protecting property and contract", e:{pros:5,eq:-5,inc:-5}, f:["propertyRights"]},
      {l:"Speech, assembly, religion, and due process", c:"A floor of dignity for every person. Enforcement needs institutions willing to uphold rights against the powerful.",
       fi:"{S} can say what he thinks at the meetings he's started attending. Whether anyone with power has to listen is another question.",
       x:"A promise of speech. Without independent courts, it will be tested — and it may not hold.",
       s:"a constitution guaranteeing civil liberties", e:{inc:5,leg:5}, f:["civilRights"]},
      {l:"Both — a full bill of rights", c:"The most ambitious founding document. Every right creates an obligation on someone to honour it.",
       fi:"The document says {D} has rights. She is {Dage} and cannot read it yet. Someone will have to make it real for her.",
       x:"The most ambitious promise. Every gap between its words and the nation's practice will be cited, loudly.",
       s:"a full bill of rights", e:{inc:10,leg:10,inst:-5}, f:["billOfRights","civilRights"]},
      {l:"A minimal document — rights defined as needed", c:"Rights not written down do not exist when they are inconvenient. Silence is never neutral.",
       fi:"Nothing is promised to the family that power cannot take back. {F} trusts the founders are good men. They will not live forever.",
       x:"When a citizen inconveniences power, nothing written will stand in the way.",
       s:"a minimal constitution", e:{leg:-5,inst:-5}, f:["minimalRights"]}
    ]},
  { cat:"Citizenship", icon:"citizenship", title:"Who counts as a citizen of this nation?",
    ctx:"This is the question every founding gets wrong — not because the founders are evil, but because 'we the people' always has an unstated definition. Say it out loud. Now live with what you said.",
    witness:{r:"D", q:"Am I a citizen? Father says yes. But Amara is my age, and Father went quiet when I asked about her."},
    choices:[
      {l:"All free persons born within our borders", c:"Principled — but 'free' is doing enormous work. If unfree persons exist here, you just decided they do not count.",
       fi:"The family qualifies. Their neighbour who arrived in chains does not. The document says 'all', with a locked door behind it.",
       x:"Whoever is unfree will one day cite the word 'all' back at you.",
       s:"citizenship for free persons born here", e:{}, f:["freeBornCitizens"]},
      {l:"All persons regardless of origin, after five years' residence", c:"Inclusive and forward-looking. Immigration becomes the most contested question the nation ever faces.",
       fi:"Yusuf the metalworker three streets over has been here eight years. Under this rule, he finally counts.",
       x:"A path in. Every hard year will test whether people believe in it.",
       s:"citizenship open to anyone after five years", e:{inc:10,coh:-5}, f:["openCitizenship"]},
      {l:"Landowners and their families only", c:"You have formalised a hereditary class system. The people locked out will spend generations trying to get in — or tearing the door down.",
       fi:"[[{F} qualifies, and {M} as his wife. {S} will qualify when he inherits. The dock workers down the road never will.||The {fam} family owns no land. Under this rule, they are residents of the nation they fought for.]]",
       x:"A locked door. The people outside it will march.",
       s:"citizenship for landowners alone", e:{inc:-20,eq:-10,leg:-5}, f:["landedCitizens"]},
      {l:"All persons born here, regardless of status", c:"The most radical founding statement possible. It contradicts any economic arrangement built on coerced labour.",
       fi:"Every child born here is a citizen — including the children of people brought here against their will. The nation has promised something it does not yet know how to keep.",
       x:"A promise that will collide with any form of unfree labour you allow.",
       s:"birthright citizenship for all", e:{inc:20,coh:-5}, f:["birthrightAll"]}
    ]},
  { cat:"Justice", icon:"justice", title:"How does your nation resolve disputes and punish wrongdoing?",
    ctx:"Someone's ox breaks your fence. A merchant cheats a farmer. A soldier kills a civilian. How a society answers reveals what it actually believes about people.",
    witness:{r:"M", q:"I have seen what happens when a powerful man wrongs a quiet woman in a town where everyone knows the man. Justice depends on who is watching."},
    choices:[
      {l:"Independent courts — judges appointed for life", c:"Impartial in theory. Appointment is political; life tenure means early appointments shape justice for decades.",
       fi:"{F}'s dispute with his neighbour goes before a judge he will never meet, appointed by men he never voted for. He trusts the process. He has not yet had reason not to.",
       x:"Courts that can tell the powerful no — the one thing that makes written rights real.",
       s:"independent courts", e:{inst:10}, f:["courts"]},
      {l:"Community juries — peers judge peers", c:"Justice reflects community values, including community prejudices. Juries protect the powerful when the powerful are popular.",
       fi:"{F}'s case is heard by twelve men from the valley. Nine went to school with his neighbour. Three owe his neighbour money.",
       x:"Neighbours judging neighbours — fair to whoever the neighbours like.",
       s:"community juries", e:{coh:5,inc:-5}, f:["juries"]},
      {l:"Elected judges — accountable to the people", c:"Judges who need votes make popular decisions. The unpopular defendant rarely gets a fair hearing.",
       fi:"The judge running for re-election knows the {fam} family by name. He also knows which verdict is easier to campaign on.",
       x:"Verdicts become campaigns. The unpopular will have no one.",
       s:"elected judges", e:{leg:5,inst:-5}, f:["electedJudges"]},
      {l:"A written code — law is the standard, interpretation minimal", c:"Written codes cannot anticipate everything. What they do not address, they deny.",
       fi:"The code was written before {M}'s situation existed. It does not address it. She falls through a gap no one thought to close.",
       x:"Where the code is silent, the vulnerable fall through.",
       s:"a fixed legal code", e:{inst:5,inc:-5}, f:["code"]}
    ]},
  { cat:"Labor", icon:"labor", title:"Who does the work — and under what conditions?",
    ctx:"Every nation needs labour. Your earlier choices have already narrowed the answer. A nation with land to develop and too few hands faces a specific temptation here.",
    geo:{island:"Thovara's plantations would be enormously profitable with enough hands. There are not enough hands.", arid:"The mines on the plateau are brutal work. Few will choose it freely at any wage the owners want to pay."},
    witness:{r:"S", q:"I did the work. He sold it for three times what he paid me. I'm not complaining. I just want to know if it will always be this way."},
    choices:[
      {l:"Free labour — every person contracts their own work", c:"Liberty as a principle. When workers outnumber jobs, wages collapse. Freedom to contract isn't freedom when one side has nothing to bargain with.",
       fi:"{S} bargains for his wage alone. His employer has twelve others like him and can wait. {S} needs to eat next week.",
       x:"Workers bargain alone — until they decide to stop bargaining alone.",
       s:"free labour", e:{pros:10,eq:-10}, f:["freeLabor"]},
      {l:"Guilds — workers organise by craft", c:"Dignified labour and quality standards. Guilds also become gatekeepers, protecting the established.",
       fi:"{S} applies to the guild. The waitlist is four years. The men who set the waitlist are the men who joined four years ago.",
       x:"Dignity for those inside, a wall for those outside.",
       s:"guild labour", e:{eq:5,pros:-5,inc:-5}, f:["guilds"]},
      {l:"Indentured contracts — labour traded for land or passage", c:"Creates an underclass whose children inherit the debt. This system has a known destination.",
       fi:"{S} could sign seven years for guaranteed work and a land grant at the end. The grant depends on the nation keeping its word.",
       x:"A debt-bound class whose children inherit their parents' contracts. They will petition.",
       s:"indentured labour", e:{pros:10,eq:-15,inc:-10}, f:["indenture"]},
      {l:"Coerced labour — enslaved or conscripted workers", c:"You have built the nation on a contradiction. That contradiction will demand resolution — violently, if it must.",
       fi:"{S}'s wages hold steady. Someone else's freedom disappears to make it possible. The family does not discuss this at dinner.",
       x:"A contradiction the nation will be forced to resolve — first by petition, then otherwise.",
       s:"built on coerced labour", e:{pros:15,eq:-20,inc:-25,leg:-10}, g:{island:{pros:5},arid:{pros:5}}, f:["coerced"]}
    ]},
  { cat:"Religion", icon:"religion", title:"What is the state's relationship to faith?",
    ctx:"The church is often the most organised institution that already exists in a new nation. It has networks, resources and people who trust it. The question is whether you formalise that.",
    witness:{r:"M", q:"The church fed us in the famine year. I haven't forgotten. I also haven't forgotten they only fed their own."},
    choices:[
      {l:"An official state religion", c:"Everyone who believes differently is now outside the national identity. That is a category you just created.",
       fi:"The family attends the state church. Yusuf's family does not. This difference, which meant nothing last year, now means something.",
       x:"Those of other faiths are now outside the national story — and will be blamed in hard years.",
       s:"an established church", e:{coh:10,inc:-15}, f:["stateChurch"]},
      {l:"Complete separation — the state has no religious role", c:"Protects minority faiths. The state must find another source of shared meaning. That is harder than it sounds.",
       fi:"{M} still goes to church on Sunday, and it still means everything to her. It just no longer speaks for the nation. She isn't sure how she feels about that.",
       x:"Faith becomes private. Shared meaning will have to come from somewhere else.",
       s:"a secular state", e:{inc:10,coh:-10}, f:["secular"]},
      {l:"Tolerated diversity — faith informs, no official religion", c:"'Tolerated' has a ceiling. Toleration is not equality. The majority faith still sets the default.",
       fi:"The family practises freely; theirs is the default faith. They will not notice the ceiling until someone shorter tries to stand under it.",
       x:"Freedom with a ceiling most people never notice.",
       s:"tolerated diversity of faith", e:{coh:5}, f:["tolerated"]},
      {l:"Religious institutions run schools, hospitals and welfare", c:"The institution providing your food and healing also shapes your values — enormous power with no democratic accountability.",
       fi:"{D} goes to school at the church. She learns her letters and her catechism at the same time. The lessons are not always easy to separate.",
       x:"The church becomes the welfare state. No voter can remove it.",
       s:"social services run by the church", e:{coh:5,inst:-5,eq:5}, f:["churchServices"]}
    ]},
  { cat:"Trade", icon:"trade", title:"How does your nation engage with the outside world?",
    ctx:"Geography has already made some decisions for you. The question is on whose terms the exchange happens.",
    geo:{coastal:"Ships already crowd {nation}'s harbour. Open the ports and they will bring wealth, strangers and disease, all at once.", landlocked:"Everything {nation} sells crosses a neighbour's land. Your neighbours know this.", island:"Thovara grows food but makes almost nothing. Close the ports and you close the shops."},
    witness:{r:"F", q:"I sold to a merchant from abroad last autumn. Best price in years. I don't know yet what I think about that."},
    choices:[
      {l:"Free trade — open borders, minimal tariffs", c:"Your domestic industries will face competition they cannot survive. The communities built around them will not forgive you.",
       fi:"The cloth {M} buys at market is cheaper since the traders came. She has not yet noticed that the woman who wove it before has lost her work.",
       x:"Cheap goods, lost trades, and strangers in the market for hard times to blame.",
       s:"open to free trade", e:{pros:10,eq:-10,coh:-5}, g:{coastal:{pros:8},landlocked:{pros:-3}}, f:["freeTrade"]},
      {l:"Protected economy — high tariffs, domestic industry first", c:"Trading partners retaliate. The goods your people need from abroad become scarce and expensive.",
       fi:"{S}'s trade is protected. The iron for his tools costs twice what it did. He passes the cost on. So does everyone.",
       x:"Jobs protected at home, and expensive everything.",
       s:"protected behind tariffs", e:{pros:-5,eq:5}, g:{island:{pros:-10},landlocked:{pros:-5}}, f:["protectionism"]},
      {l:"Strategic trade — open for some goods, protected for others", c:"In practice, every industry considers itself strategic. The lobbying begins on day one.",
       fi:"The family trades freely. The industries that matter to men with more influence than {F} are protected. This seems fair to everyone who is protected.",
       x:"A list of protected industries, and a queue of men who want to be on it.",
       s:"trading selectively", e:{pros:5,inst:-5}, f:["strategicTrade"]},
      {l:"State-controlled trade — the government negotiates all exchange", c:"A bureaucracy now decides which merchants succeed. Corruption follows.",
       fi:"{M} applies for a trading licence. The office is in the capital; the queue is eight months. She wonders if she knows anyone who knows anyone.",
       x:"Every licence becomes a favour, and favours have prices.",
       s:"trading only through the state", e:{inst:-10,eq:-5}, f:["stateTrade"]}
    ]},
  { cat:"Education", icon:"education", title:"How are children educated in your nation?",
    ctx:"The children born today will govern this nation in thirty years. What you decide now determines what they know — and who gets to know it at all.",
    witness:{r:"D", q:"I want to read everything. My brother says that's a lot. I said I know."},
    choices:[
      {l:"Private — families and churches provide education", c:"Wealthy families produce educated children. Poor families produce children who work early. In one generation the gap becomes nearly impossible to cross.",
       fi:"{D} learns her letters from {M}. Three streets over, a girl her age has no mother who can read.",
       x:"The gap between families widens with every generation.",
       s:"educating its children privately", e:{eq:-10}, f:["privateEd"]},
      {l:"Public schools — funded by collective taxation", c:"The state now shapes what is taught. Enlightenment or indoctrination, depending entirely on who holds power.",
       fi:"{D} sits beside the magistrate's son and learns what he learns — including the version of history written by his grandfather.",
       x:"A shared floor for every child — and a budget someone will be tempted to raid.",
       s:"educating every child in public schools", e:{eq:10,inc:5,pros:5}, f:["publicEd"]},
      {l:"Apprenticeship — children learn a trade from a master", c:"Locks children into their parents' economic class, with very few exceptions.",
       fi:"{D} is apprenticed at twelve. She is good at the work. She will always wonder what else she might have been good at.",
       x:"Children inherit their parents' trades — and their parents' station.",
       s:"apprenticing its children", e:{eq:-5,pros:5}, f:["apprenticeEd"]},
      {l:"Hybrid — public basics, private advancement", c:"A floor of shared knowledge, a ceiling of private opportunity. The gap between them tends to grow.",
       fi:"{D} learns to read and cipher. She could go further, if the family can pay. {M} is already calculating.",
       x:"A floor for everyone, and a ceiling with a price.",
       s:"offering public basics and private advancement", e:{pros:5}, f:["hybridEd"]}
    ]},
  { cat:"Accountability", icon:"accountability", title:"How does your nation stop those in power from serving themselves?",
    ctx:"Everyone who helped build this nation believes they are acting for its good. So did everyone who ever looted one. The question is not intention. It is architecture.",
    witness:{r:"F", q:"I trust the men who built this. I just hope it's built well enough that it doesn't need my trust forever."},
    choices:[
      {l:"Transparency — all government decisions made in public", c:"Sunlight as disinfectant. Public deliberation is slow and vulnerable to populism; the loudest voices dominate.",
       fi:"{F} attends the public meeting. A hundred people come; twelve do all the talking. He goes home feeling he was present but not heard.",
       x:"Slow and loud — but hard to steal from in the dark.",
       s:"governing in public view", e:{leg:10,coh:-5}, f:["transparency"]},
      {l:"Separation of powers — no single body controls everything", c:"The most durable safeguard in history. Also produces gridlock and each branch creeping into the others' territory.",
       fi:"{M}'s complaint about a licence passes through council, court and executive. It takes three years. She wins, eventually.",
       x:"Gridlock — and the most durable safeguard anyone has found.",
       s:"with powers separated", e:{inst:15,pros:-5}, f:["separation"]},
      {l:"Rotation — no one holds power beyond a fixed term", c:"Prevents entrenchment. Expertise constantly cycles out; institutional memory lives in an unelected bureaucracy.",
       fi:"The official who helped {F} last year is gone. The new one doesn't know him. The process starts again from the beginning.",
       x:"No one entrenches. No one remembers, either.",
       s:"rotating its officeholders", e:{inst:-5,leg:5}, f:["rotation"]},
      {l:"Trust in the character of our founders", c:"The founders are genuinely remarkable people. They will not live forever. This is not a system. It is a prayer.",
       fi:"{F} knows two of the founders personally. Good men. He trusts them completely. He does not think about who comes after them. Not yet.",
       x:"It works once, for one generation.",
       s:"trusting its founders' character", e:{inst:-20}, f:["trustFounders"]}
    ]}
];

// ═══════════════════════════════════════════════════════════
// FAULT LINES — contradictions detected in the founding
// ═══════════════════════════════════════════════════════════
const FAULTS = [
  {w:h=>h.has("coerced")&&(h.has("birthrightAll")||h.has("civilRights")), t:"The founding document promises rights to persons. The labour statutes decide who counts as one."},
  {w:h=>h.has("coerced")&&!(h.has("birthrightAll")||h.has("civilRights")), t:"The nation's prosperity rests on people it does not count."},
  {w:h=>h.has("indenture"), t:"Contracts that pass a parent's debt to the child."},
  {w:h=>h.has("executive")&&h.has("trustFounders"), t:"One office, no limits, and a founder in it. The founder is mortal."},
  {w:h=>h.has("executive")&&!h.has("trustFounders"), t:"A strong office whose next occupant no one has met."},
  {w:h=>h.has("councilDynasty"), t:"Seats won by merit, to be inherited by sons."},
  {w:h=>h.has("landedCitizens"), t:"A citizenry defined by deeds. Most people hold none."},
  {w:h=>h.has("propertyVote")&&!h.has("landedCitizens"), t:"A vote that stops at the property line."},
  {w:h=>h.has("noLandRules"), t:"Land without law. Someone will bring law of their own."},
  {w:h=>h.has("stateChurch")&&(h.has("openCitizenship")||h.has("birthrightAll")), t:"Citizens of every origin; one official faith."},
  {w:h=>h.has("federation"), t:"Provinces united against enemies, divided on everything else."},
  {w:h=>h.has("civilRights")&&!h.has("courts"), t:"Rights on paper, and no independent court to hold them."},
  {w:h=>h.has("minimalRights"), t:"Nothing promised that power cannot take back."},
  {w:h=>h.has("trustFounders")&&!h.has("executive"), t:"Safeguards that consist of trust."},
  {w:h=>h.has("privateLand")&&h.has("privateEd"), t:"Land and learning both inherited. The ladder has very few rungs."},
  {w:h=>h.has("stateTrade")||h.has("stateResources"), t:"National wealth in the hands of whoever holds the state."}
];

// ═══════════════════════════════════════════════════════════
// CRISES — each has era, year, weight w(h) (≥100 = forced),
// a cause line (why this arrived), story, choices with effects.
// choice: l c e f · after (what happened) · fam (what it meant for the family)
// ═══════════════════════════════════════════════════════════
const CRISES = [
  // ── ERA II ──────────────────────────────
  { id:"plague", era:2, year:8, type:"Plague", icon:"plague", title:"The fever ships",
    w:h=>h.geo("coastal")?((h.has("propertyVote")||h.has("councilDynasty")||h.has("federation"))?5:3):0,
    cause:h=>"Arrived because {nation} is a port nation"+((h.has("propertyVote")||h.has("councilDynasty")||h.has("federation"))?", and its government decides slowly.":"."),
    story:h=>`<p>A ship came in on a Tuesday. By Thursday the harbour district smelled wrong. The apothecary knew what it was before the government did, and sent word: close the harbour, seal the district, do it now.</p><p>The message sat nine days on a clerk's desk while the merchants explained what a closed harbour would cost. The trading season is short. Most of the sick are poor, and none of them were in the room.</p><p>{M} was called to three births in the harbour district that month. Each time she came home she washed her hands twice and said nothing about where she'd been.</p>`,
    insp:"Inspired by the 1793 Philadelphia yellow fever epidemic and the cholera years in port cities.",
    choices:[
      {l:"Close the harbour and seal the district", c:"The fever is contained. The trading season is lost.", e:{pros:-10,leg:5,inst:5},
       after:"Four hundred fall sick, and the fever stops at the district wall. The merchants never forgive the council; several councillors lose their seats.",
       fam:"{M} spends six weeks inside the cordon, delivering babies by lamplight. She comes out thinner and never talks about it."},
      {l:"Seal the district, keep the harbour open", c:"A compromise. The fever moves slower — but it moves.", e:{pros:-3,coh:-5,eq:-5},
       after:"The fever slips the cordon in the third week and reaches the market. The toll is twice what a full closing would have cost.",
       fam:"The stall beside {M}'s at the market closes for good. Its owner is buried the same week as his wife."},
      {l:"Issue guidance; mandate nothing", c:"Commerce continues. So does the fever.", e:{pros:3,leg:-10,eq:-10}, f:["endemicFever","motherFever"],
       after:"The harbour stays open. The fever settles into the port like a tenant, returning every few summers for thirty years.",
       fam:"{M} catches it in the second summer. She lives, but her lungs never fully recover."}
    ]},
  { id:"road", era:2, year:9, type:"Blockade", icon:"road", title:"The closed road",
    w:h=>h.geo("landlocked")?4:0,
    cause:h=>"Arrived because everything {nation} trades must cross a neighbour's land.",
    story:h=>`<p>In the ninth year the neighbour to the east closed the road. No declaration, no shots — just a line of soldiers at the river crossing and a letter explaining that {nation}'s grain would now pay a toll of one part in four.</p><p>Within a month the price of salt has doubled and the price of grain has halved.</p><p>{F} has a barn full of harvest he cannot sell. {S} has been talking to the recruiting sergeant who sets up a table outside the inn every market day.</p>`,
    insp:"Inspired by the trade blockades faced by landlocked states, from 19th-century Paraguay to modern customs wars.",
    choices:[
      {l:"Pay the toll and negotiate a treaty", c:"Trade resumes. The neighbour learns what {nation} will tolerate.", e:{pros:-8,leg:-5,coh:-5},
       after:"A treaty brings the toll down to one part in six. The minister who signed it is hanged in effigy in two market towns.",
       fam:"{F} sells his harvest at last, at a loss. He says it is better than rotting. He doesn't sound convinced."},
      {l:"Raise an army and open the road by force", c:"National pride, a conscription list, and the price of war.", e:{coh:10,pros:-5,inst:-5}, f:["borderWar","S_soldier"],
       after:"A short war, then a longer one. The road opens in the second year. Eleven hundred men do not come home.",
       fam:"{S} is taken in the first levy. He comes back eighteen months later, quieter, with a limp he won't explain."},
      {l:"Seek a distant ally — protection in exchange for favours", c:"The road reopens. A foreign power gains a voice in the capital.", e:{pros:5,leg:-10,inst:-5}, f:["foreignPatron"],
       after:"A great power two borders away guarantees the road. Its merchants receive favourable terms. Its advisers receive offices.",
       fam:"The new customs officer in the valley speaks with an accent. {F} pays him exactly what he asks."}
    ]},
  { id:"landgrab", era:2, year:10, type:"Land", icon:"stakes", title:"The surveyors",
    w:h=>h.has("noLandRules")?100:h.has("stateResources")?3:0,
    cause:h=>h.has("noLandRules")?"Arrived because the founding left land without rules.":"Arrived because the state's land became a prize.",
    story:h=>`<p>The surveyors arrived with chains, stakes, and twenty men with rifles. They work for the Northern Land Company, which holds a paper from someone in the capital. The paper is either a grant or a forgery, and no office in {nation} can say which.</p><p>They staked out the valley in nine days, including fields families have worked since before independence. Asked by what right, the foreman pointed at the rifles.</p><p>{F} walked out to the stake they drove at the edge of [[{Fhold}||the field he leases]] and stood there a long time. That evening {S} cleaned his grandfather's musket, and {M} watched him do it.</p>`,
    insp:"Inspired by the Yazoo land fraud, the enclosure of common land, and frontier land companies.",
    choices:[
      {l:"Create a land registry — first recorded claim wins", c:"Order, quickly. The company has lawyers.", e:{inst:10,eq:-10}, f:["landRegistry"],
       after:"The registry opens in spring. The company's clerks are waiting at the door on opening day.",
       fam:"[[{F} files in the second week and keeps his land — barely, on the strength of a tax receipt from before the war.||{F}'s landlord files first. {F} remains a tenant; now the paper says so.]]"},
      {l:"Title the land to those who work it", c:"Justice for the tillers. The company's investors will remember.", e:{eq:12,pros:-5,inst:5,leg:5}, f:["landToTillers","F_ownsLand"],
       after:"Every family that has worked a field for five years receives title. The company sues, and loses.",
       fam:"[[{F}'s title arrives in a brown envelope. He has it framed.||{F} holds title to the field he has worked for nineteen years. He reads the deed aloud at supper. Twice.]]"},
      {l:"Let the claimants settle it themselves", c:"The state stays out. Others won't.", e:{inst:-15,eq:-10,coh:-10}, f:["valleyViolence","S_radical"],
       after:"They settle it. Three men die in the valley that summer, and the company's stakes are still standing in autumn.",
       fam:"{S} is arrested after a fight at the stakes and released without charge — which is its own kind of message."}
    ]},
  { id:"school", era:2, year:11, type:"Corruption", icon:"corruption", title:"The woman who ran the school",
    w:h=>(h.has("publicEd")||h.has("hybridEd")||h.has("churchServices"))?((h.has("trustFounders")||h.has("rotation")||h.has("stateTrade")||h.has("stateResources"))?6:2):0,
    cause:h=>"Arrived because the schools have public money, and "+(h.has("separation")?"even separated powers have seams.":"little stands between that money and the men who want it."),
    story:h=>`<p>A woman named Delia ran the valley school for nine years. She taught a hundred and forty children to read, including {D}.</p><p>The new district administrator arrived last spring — the brother-in-law of a councillor. He redirected the school's funding to a road that runs through land he owns. Delia appealed. The councillor whose brother-in-law is the administrator chairs the appeals committee. The school closed in autumn.</p><p>{D} came home and told {M}. {M} was quiet a long time. Then she said, "We'll find another way." Her voice was tired when she said it.</p>`,
    insp:"Inspired by machine politics in 19th-century American cities and the defunding of Reconstruction-era schools.",
    choices:[
      {l:"Establish an independent oversight body", c:"Future Delias have somewhere to appeal. This school stays closed for now.", e:{inst:15,leg:5}, f:["oversight"],
       after:"An inspectorate is created with power to audit any office. The administrator is removed two years later. The school reopens after three.",
       fam:"{D} finishes her lessons at the kitchen table. She remembers the name of the inspectorate for the rest of her life."},
      {l:"Remove the administrator under existing rules", c:"Fast and specific. The system that appointed him is untouched.", e:{inst:5},
       after:"The school reopens six months later. Some of its children have already gone to work and do not come back.",
       fam:"{D} returns to her desk. The boy who sat beside her does not."},
      {l:"No action — a district matter", c:"The council stays out of district affairs.", e:{inst:-15,eq:-8,leg:-5}, f:["schoolsLost"],
       after:"Within five years three more valley schools close the same way. The roads are excellent.",
       fam:"{D}'s schooling ends at {Dage}."}
    ]},
  { id:"badyear", era:2, year:14, type:"Hardship", icon:"drought", title:"The bad year",
    w:h=>2+((h.has("privateLand")||h.has("noLandRules"))?3:0)+((h.geo("arid")||h.geo("plains")||h.geo("island"))?2:0),
    cause:h=>"Arrived because hard years always come"+((h.has("privateLand")||h.has("noLandRules"))?", and {nation}'s land rules decide who survives them.":"."),
    story:h=>{
      const open = h.geo("island")?"The storm came in from the southeast and stayed three days. It took the roofs, then the boats, then salted the low fields."
        : h.geo("arid")?"The great river dropped to a trickle in June and stopped altogether in August."
        : "No rain fell from April to September. The wells went first, then the river, then everyone's patience.";
      return `<p>${open} The harvest will be a quarter of what the {fam} family needs. [[The ox was sold in July to pay the tax on {Fhold}.||The ox was sold in July to pay the lease.]]</p><p>{M} walked three miles to the district office to ask for relief. The clerk said the emergency fund had been spent on roads. He was sorry. He wrote the family's name in a book.</p><p>The district's largest landowner has a deep well that still runs. He sells water at a price no one in the valley can pay. {S} has heard about men in other districts who stopped asking politely.</p>`;},
    insp:"Inspired by the Dust Bowl, the Irish Famine land clearances, and the American farm foreclosures of the 1930s.",
    choices:[
      {l:"Open the treasury — emergency relief", c:"The small farms survive. Every future hard year arrives as a political demand.", e:{eq:8,pros:-8,leg:10}, f:["reliefPrecedent"],
       after:"Relief arrives in October. Most small farms survive the winter. From now on, every bad year arrives at the capital as a demand.",
       fam:"The {fam} family keeps [[{Fhold}||its lease]]. {F} pays back every coin, though no one asked him to."},
      {l:"Broker a deal with the large landowners", c:"Slower, partial, and paid for in concessions.", e:{eq:-5,pros:-2,leg:-3},
       after:"The landowners share water in exchange for tax concessions that outlast the drought by thirty years.",
       fam:"[[{F} keeps {Fhold}, but sells the east field to the man with the well.||{F}'s lease is renewed at a higher rent. The landlord calls it fair, given the risk.]]"},
      {l:"Let the market adjust", c:"Prices find their level. So do families.", e:{eq:-15,pros:5,leg:-10,coh:-5}, f:["F_lostLand","consolidation"],
       after:"Small farms sell to large ones at distressed prices. Within three years the valley has half as many owners.",
       fam:"The {fam} family [[sells {Fhold}||gives up the lease]] and moves to the city. {F} finds work in a warehouse. He is good at it. He hates it."}
    ]},
  { id:"nativism", era:2, year:17, type:"Nativism", icon:"nativism", title:"The outsider's shop",
    w:h=>1+(h.has("openCitizenship")?3:0)+(h.has("stateChurch")?2:0)+(h.has("freeTrade")?2:0)+(h.has("freeBornCitizens")?1:0),
    cause:h=>"Arrived because hard times look for someone to blame"+(h.has("stateChurch")?", and the established church has made Yusuf's faith foreign.":"."),
    story:h=>{
      const status = h.has("birthrightAll")?"His daughters are citizens by birth. He is not, and the law has no path for him."
        : h.has("openCitizenship")?"His citizenship application is complete. It has been 'under review' for six years."
        : "There is no path in the law for a man like him to become a citizen.";
      return `<p>A man named Yusuf came here twelve years ago with a letter of introduction and a talent for metalwork. He built a shop, employs four people, pays his taxes, and is raising two daughters born in this nation. ${status}</p><p>A poor harvest made the valley angry. Someone in the market started saying there isn't enough because people like Yusuf are taking it. It isn't true. But it is simple. Last Tuesday, his shop window was broken.</p><p>{D} plays with Yusuf's daughter Amara. She asked {F} why Amara's family wasn't safe here. He said of course they're safe. {D} looked at him as if she were waiting for the rest of the answer.</p>`;},
    insp:"Inspired by the Chinese Exclusion Act, anti-Jewish laws in 19th-century Europe, and scapegoating in hard economic times.",
    choices:[
      {l:"Make the path to citizenship clear and fair", c:"Yusuf gains legal standing. The anger looks for another target.", e:{inc:10,coh:-5,leg:5}, f:["yusufCitizen"],
       after:"Yusuf takes the oath in the spring. The anger finds another target, as anger does — but he has standing now, and so will his daughters.",
       fam:"{D} goes with Amara to watch her father take the oath. She claps louder than anyone."},
      {l:"Enforce the law — prosecute the men who broke the window", c:"Order is upheld. The question of belonging is left open.", e:{inst:5},
       after:"Two men are fined. The resentment is not addressed, and whether Yusuf belongs here remains officially unanswered.",
       fam:"Yusuf replaces the window. He keeps a cudgel behind the counter now. Amara stops coming to play after dark."},
      {l:"Restrict immigration — answer the public mood", c:"The mood is satisfied. The message is received.", e:{inc:-15,coh:5,pros:-5}, f:["yusufLeft"],
       after:"The message is clear. Yusuf sells the shop. The nation loses a metalworker, four jobs, and two daughters who might have been anything.",
       fam:"Amara leaves on the autumn coach. {D} writes to her for eleven years. Then the letters stop."}
    ]},
  { id:"petition", era:2, year:19, type:"Petition", icon:"revolt", title:"The petition",
    w:h=>h.has("coerced")?100:h.has("indenture")?5:0,
    cause:h=>h.has("coerced")?"Arrived because the nation counts some people as property"+(h.has("civilRights")||h.has("birthrightAll")?" while its founding document says otherwise.":"."):"Arrived because indenture contracts pass from parents to children.",
    story:h=> h.has("coerced")
      ? `<p>A man named Cassius was born in this nation, on land his father cleared and was not permitted to own. He taught himself to read from a stolen primer. He has organised forty-seven others and written a petition to the government, citing the founding document's own words.</p><p>The government must now decide whether Cassius and the forty-seven are persons under the law.</p><p>{S} was at the meeting where the petition was drafted. He came home and couldn't sleep. {F} told him to stay out of it. {M} said nothing, which is not the same as agreeing.</p>`
      : `<p>A man named Cassius was born under his father's indenture. The contract was for seven years; fines for illness, broken tools and "insolence" extended it to thirty-one, and on his father's death the balance passed to him. He taught himself to read and has organised forty-seven others in the same position.</p><p>Their petition asks one thing: that no child inherit a parent's contract.</p><p>{S} was at the meeting where the petition was drafted. He came home and couldn't sleep. {F} told him to stay out of it. {M} said nothing, which is not the same as agreeing.</p>`,
    insp:"Inspired by the free Black petitions to early American legislatures, Frederick Douglass, and Dred Scott.",
    choices:[
      {l:"Honour the founding document — grant them standing", c:"Cassius becomes a citizen. Every arrangement that depended on his exclusion must be renegotiated.", e:{inc:20,pros:-10,coh:-10,leg:10}, f:["abolished"],
       after:"The vote passes by four. The economic order built on Cassius's exclusion begins to come apart, and its owners do not go quietly.",
       fam:"{S} was in the gallery when the vote was read. He came home and slept fourteen hours."},
      {l:"Suppress the petition — maintain order", c:"Order holds. The petitioners' children will organise differently.", e:{inc:-10,leg:-15,coh:-5}, f:["suppressed","S_radical"],
       after:"The petition is burned in the square. Cassius disappears from the record. His children will not write petitions.",
       fam:"{S} watched the petition burn. Something in him did not come home from the square."},
      {l:"Form a committee — promise future consideration", c:"Nothing is refused. Nothing is granted.", e:{leg:-5}, f:["deferred"],
       after:"The committee meets for six years and recommends further study. Cassius dies at fifty-one, never having been a legal person in the nation of his birth.",
       fam:"{S} stops going to meetings. {M} isn't sure whether that is better or worse."}
    ]},
  { id:"tariff", era:2, year:24, type:"Regions", icon:"tariff", title:"The tariff war",
    w:h=>h.has("federation")?6:0,
    cause:h=>"Arrived because the federation's provinces want opposite things from trade.",
    story:h=>`<p>The coastal provinces want open ports and cheap imports. The interior provinces want tariffs to protect their mills. Under the federation each may set its own duties — so the interior now taxes coastal goods, and the coast has answered in kind.</p><p>There are customs houses on roads that had no gates a year ago. A cart of grain crossing two provincial lines pays twice before it reaches the sea.</p><p>{F} took a load to the provincial market and came home with less than he left with. The governor of the next province has begun speaking of "our people" and "theirs."</p>`,
    insp:"Inspired by the trade wars between states under the American Articles of Confederation, and the Nullification Crisis.",
    choices:[
      {l:"Negotiate a national compromise", c:"Everyone gives up something. Everyone resents it.", e:{coh:5,pros:-3,leg:3},
       after:"A single schedule of duties is agreed after nine months. No province is satisfied, which is how everyone knows it is fair.",
       fam:"The gates come down on the valley road. {F} takes a load to market and comes home with what he expected, which feels like a victory."},
      {l:"Let each region set its own terms", c:"Local control, as promised. The union becomes looser.", e:{coh:-15,pros:3}, f:["regionalSplit"],
       after:"The provinces drift. Within ten years they print different money and teach different histories.",
       fam:"{F} now pays a toll to carry goods to the next province: thirty miles, two customs houses."},
      {l:"Override the provinces from the centre", c:"Unity, imposed. The federation's promise is broken.", e:{coh:-5,leg:-10,inst:5}, f:["centralized"],
       after:"The central government seizes control of trade. The provinces comply, and keep a list.",
       fam:"{S} hears men at the docks talking about the provinces' rights the way his father once talked about independence."}
    ]},

  // ── ERA III ─────────────────────────────
  { id:"flood", era:3, year:27, type:"Clearance", icon:"flood", title:"The flood and the fence",
    w:h=>(h.has("privateLand")&&(h.has("freeLabor")||h.has("indenture")||h.has("coerced")))?5:(h.has("privateLand")||h.has("consolidation"))?2:0,
    cause:h=>"Arrived because private land and cheap labour make tenants easy to replace.",
    story:h=>`<p>The river flooded in March and took forty houses with it. The families who lived there had farmed the same land as tenants for two generations. The land belongs to a man in the capital who has never seen it.</p><p>After the flood, the landowner decided not to rebuild the tenant houses. The land is worth more without them. He will bring in seasonal workers instead.</p><p>[[{F} knows three of the forty families. He helped one of them rebuild after the last flood. He has been asked to speak at the town meeting, and is trying to decide whether saying anything will matter.||The {fam} family's house is one of the forty. {F} has been asked to speak for the tenants at the town meeting. He has never spoken in public in his life.]]</p>`,
    insp:"Inspired by the Highland Clearances, The Grapes of Wrath, and the land consolidation after the 1927 Mississippi flood.",
    choices:[
      {l:"Compulsory purchase — the state buys the land and resettles the families", c:"The families stay. Property rights are no longer absolute in a crisis.", e:{eq:10,pros:-5,inst:5}, f:["eminentDomain","F_ownsLand"],
       after:"The families stay. A precedent is set that property can be taken for the public good — and it will be used again, not always this kindly.",
       fam:"[[{F} helps raise the first new roof.||The {fam} family rebuilds on land the state sells them at cost. {F} and {S} raise the roof themselves.]]"},
      {l:"Public works — build city housing and offer relocation", c:"The families are housed. The valley changes for good.", e:{coh:-5,pros:5},
       after:"Most families go. They become urban poor instead of rural poor. The valley empties and grows quiet.",
       fam:"[[Two of the three families {F} knew move to the city. He never sees them again.||The {fam} family moves into a city tenement with running water and no fields. {F} counts this as half a loss.]]"},
      {l:"Mediate between landowner and tenants", c:"A settlement both sides sign because one side has no choice.", e:{eq:-10,leg:-5},
       after:"The landowner offers six months' notice and a small payment. The families accept because they have no alternative, and scatter.",
       fam:"[[{F} speaks at the meeting anyway. Afterwards, no one says anything to him at all.||The {fam} family takes the payment. {F} finds day labour in the next district.]]", ff:{landless:["F_lostLand"]}}
    ]},
  { id:"veterans", era:3, year:28, type:"Broken promise", icon:"wardebt", title:"The soldier's debt",
    w:h=>h.has("borderWar")?100:(h.fam.sonSoldier?4:0)+(h.has("executive")?3:0),
    cause:h=>h.has("borderWar")?"Arrived because {nation} sent men to open the road and promised them land.":"Arrived because the founding promised land to the men who won independence.",
    story:h=>{
      const vet = h.has("S_soldier")||h.fam.sonSoldier;
      return `<p>${h.has("borderWar")?"The men who fought to open the road":"The men who fought for independence"} were promised land — forty acres each on the western frontier.</p><p>${vet?"{S}":"{S}'s friend Tomas"} arrived at the land office with his discharge papers. The clerk said the land had been allocated to a development company. A clerical error. There is a process for appeals; it takes two years.</p><p>${vet?"{S} slept in a barn that winter":"Tomas slept in {F}'s barn that winter"}, and there were hundreds like him. {F} wrote to the government. The letter was acknowledged. Nothing else happened. Some of the men are no longer waiting quietly.</p>`;},
    insp:"Inspired by the Bonus Army of 1932, unpaid Revolutionary War veterans, and Shays' Rebellion.",
    choices:[
      {l:"Honour the grants — find and restore the promised land", c:"Expensive and slow. The nation keeps its word.", e:{pros:-10,leg:10,eq:5}, f:["veteransHonored"],
       after:"It takes three years and a special tax, but every grant is honoured. The development company is compensated with less than it wanted.",
       fam:"{S} walks his forty acres in the spring. He doesn't farm them — he sells them to a neighbour who will — but he walks them first."},
      {l:"Offer money instead", c:"A payment, less than the land was worth.", e:{pros:-5},
       after:"A payment is made. Most men take it because they have no alternative. They do not forget.",
       fam:"The payment buys {S} a winter coat and a debt paid off. He keeps the land office's letter in the same drawer as his medal."},
      {l:"Acknowledge the error and begin the appeals process", c:"Procedure is respected. Time passes.", e:{leg:-15,inst:-5,coh:-5}, f:["veteransBetrayed"],
       after:"The process takes four years. By then, seventeen of the men have done something that needs its own entry in the history books.",
       fam:"{S} stops talking about the land. He starts talking about the men who took it."}
    ]},
  { id:"strike", era:3, year:29, type:"Labour", icon:"strike", title:"The strike",
    w:h=>1+(h.has("freeLabor")?4:0)+(h.has("guilds")?2:0)+(h.has("indenture")?2:0),
    cause:h=>h.has("freeLabor")?"Arrived because workers who bargain alone eventually stop bargaining alone.":"Arrived because work is plentiful and wages are not.",
    story:h=>`<p>The owners of {Swork} cut wages by a third in the slack season and did not restore them in the busy one. Six hundred men walked out on a Monday.</p><p>${h.has("coerced")&&!h.has("abolished")?"By Wednesday the owners had rented bonded labourers to take their places. The strikers watched men who could not refuse do the work they had refused.":"By Wednesday the owners had brought in replacements from three provinces away, with hired guards to walk them through the gates."}</p><p>{S} is on the strike committee. {M} has started keeping the door barred at night. {F} says the owners have a right to run their business; then he asks {S} if he's eaten.</p>`,
    insp:"Inspired by the Pullman Strike, the Homestead Strike, and the Tolpuddle Martyrs.",
    choices:[
      {l:"Recognise the right to organise", c:"The strike ends with a contract. The owners call it theft.", e:{eq:12,pros:-5,leg:5}, f:["unions"],
       after:"The owners sign a contract in the fourth week. Wages return. Within ten years every trade in the nation has a union.",
       fam:"{S} signs the contract for the committee. His hand shakes. He keeps the pen."},
      {l:"Break the strike — protect the owners' property", c:"The gates reopen. So does the old wage.", e:{eq:-10,leg:-10,coh:-10}, f:["strikeBroken","S_blacklisted"],
       after:"Soldiers clear the gates. Two strikers die. The work resumes at the lower wage, and the committee's names go on a list.",
       fam:"{S}'s name is on the list. He never works at {Swork} again."},
      {l:"Create an arbitration board", c:"A neutral table. It works when both sides believe it is neutral.", e:{inst:10,eq:5,leg:3}, f:["arbitration"],
       after:"The board splits the difference. Neither side is happy. Both come back to the board next time, which is the point.",
       fam:"{S} testifies before the board for two hours. Afterwards he says it was the first time anyone with power wrote down what he said."}
    ]},
  { id:"succession", era:3, year:31, type:"Succession", icon:"seat", title:"The empty chair",
    w:h=>(h.has("executive")&&h.has("trustFounders"))?100:h.has("executive")?5:h.has("councilDynasty")?4:0,
    cause:h=>h.has("executive")?"Arrived because the executive's office was built around one man.":"Arrived because the founders' seats were never designed to be vacated.",
    story:h=> h.has("executive")
      ? `<p>The first executive died in the spring, in office, at seventy-four. He had governed for thirty years and named no successor, because no one ever asked him to.</p><p>Three men now claim the office: his son, who has his name; the general who commanded the capital garrison, who has the soldiers; and the chief of the advisory council, who has the constitution, insofar as it says anything.</p><p>{F} has the newspaper spread across the table and is reading it for the third time. {S} says it doesn't matter who wins. {M} says it always matters who wins.</p>`
      : `<p>The last of the founding councillors died in the spring. His son has announced he will take the seat, as the sons of the other founders already have.</p><p>No one elected the son. No one elected the father either — but the father had earned it, and everyone knew how. The son has earned a very good education.</p><p>{F} reads the announcement twice. {S} says the council is a family business now. {M} says it was always going to be.</p>`,
    insp:"Inspired by the deaths of founding strongmen and the crises of succession that followed, from Cromwell to post-colonial presidencies.",
    choices:[
      {l:"Hold an open election for the seat", c:"The constitution is honoured. The losers must accept it.", e:{leg:10,inst:10,coh:-10}, f:["peacefulTransfer"],
       after:"An election is held. It is bitter, close, and peaceful. The loser concedes in a letter printed on the front page.",
       fam:"{F} reads the results aloud at supper. Then he reads the loser's letter aloud too, slowly, as if it were scripture."},
      {l:"Accept the heir", c:"Continuity and calm. The office becomes an inheritance.", e:{coh:5,inst:-15,leg:-5}, f:["dynasty"],
       after:"The heir takes the chair. He is not his father. The office, now a family possession, grows around him like a shell.",
       fam:"{S} says, quietly, that he didn't fight for independence from one family to be ruled by another. {F} tells him to lower his voice."},
      {l:"Let the army keep order until things settle", c:"Order is guaranteed. Things do not settle.", e:{leg:-20,inst:-20}, f:["junta"],
       after:"The general keeps order. He is still keeping it twelve years later.",
       fam:"Soldiers are posted at the bridge. {M} walks the long way round to market rather than pass them."}
    ]},
  { id:"march", era:3, year:33, type:"The vote", icon:"march", title:"The long walk",
    w:h=>h.has("landedCitizens")?100:h.has("propertyVote")?6:0,
    cause:h=>h.has("landedCitizens")?"Arrived because the founding made land the price of citizenship.":"Arrived because the vote stops at the property line.",
    story:h=>`<p>Three thousand people who cannot vote are walking to the capital. Tenant farmers, dock workers, seamstresses, widows whose land was in a husband's name. It is a nine-day walk. They sleep in fields and church halls along the way, and every town adds a few hundred more.</p><p>Their banner has a line from the founding document on it, with one word underlined.</p><p>${h.fam.landed?"{M} has never voted; the deed is in {F}'s name. She has packed a bag.":"No one in the {fam} family has ever voted. {M} has packed a bag; {S} is carrying the banner."} {F} has not said whether he is coming. He is standing by the door.</p>`,
    insp:"Inspired by the Chartists, the Selma to Montgomery marches, and the women's suffrage processions.",
    choices:[
      {l:"Extend the vote to every adult citizen", c:"The nation's electorate triples overnight. So do its demands.", e:{inc:20,leg:10,coh:-5}, f:["universalVote"],
       after:"The vote passes after an all-night session. The marchers hear the news on the capitol steps. Some of them sit down on the stone and cry.",
       fam:"{M} votes for the first time at {Mage}. She wears her good dress."},
      {l:"Extend the vote to men who pay taxes", c:"A wider door — still a door.", e:{inc:8,leg:2}, f:["partialVote"],
       after:"Tax-paying men gain the vote. The marchers split: half go home satisfied, half keep walking.",
       fam:"{S} can vote now. {M} still cannot. They do not discuss it."},
      {l:"Disperse the march — the law is the law", c:"The capital is quiet. The countryside is not.", e:{leg:-15,coh:-10,inst:-5}, f:["marchDispersed","S_radical"],
       after:"Cavalry meet the march at the river bridge. The marchers scatter. The banner is kept, and copied, and carried again.",
       fam:"{M} was at the bridge when the cavalry came. She walked home, forty miles, and did not speak for two days."}
    ]},
  { id:"rising", era:3, year:35, type:"Uprising", icon:"revolt", title:"The rising",
    w:h=>(h.has("suppressed")||h.has("deferred"))?100:(h.has("coerced")&&!h.has("abolished"))?100:0,
    cause:h=>h.has("suppressed")?"Arrived because the petition was burned.":h.has("deferred")?"Arrived because the committee is still studying the question.":"Arrived because the contradiction was never addressed.",
    story:h=>`<p>Cassius has been dead for years. His son Marcus does not write petitions.</p><p>On a night in late summer, workers on eleven estates put down their tools at once and walked off together. By morning there were four thousand of them on the hill road, some armed. Their single demand is printed on a sheet nailed to every church door in the district: <em>The document says all persons. Prove it.</em></p><p>{S} is ${h.has("S_radical")?"already with them":"in town when the news arrives"}. {F} says the government must restore order. {D} asks what order means, exactly, and nobody at the table answers her.</p>`,
    insp:"Inspired by the Haitian Revolution, Nat Turner's rebellion, the Morant Bay rebellion, and the American Civil War.",
    choices:[
      {l:"Abolish coerced and bonded labour, now", c:"The founding promise is kept, late and under fire. The estates will not accept it quietly.", e:{inc:20,coh:-10,leg:5,pros:-10}, f:["abolished"],
       after:"Abolition passes in eleven days. Three estate owners take up arms and are defeated within the year. The rest sue, and lose, and live.",
       fam:"{D} reads the act of abolition aloud to {F}, who has gone grey. He listens to all of it. When she finishes he nods once and says, 'Good.'"},
      {l:"Crush the rising", c:"Order, at a price that will be paid for generations.", e:{leg:-20,coh:-20,inst:-10}, f:["civilWar"],
       after:"The army is sent. The rising becomes a war, the war becomes a decade, and the nation is never again one thing.",
       fam:"{S} does not come home for four years. When he does, he does not say which side he was on, and no one asks."},
      {l:"Gradual emancipation over twenty years", c:"A promise with a date on it. Those still bound must wait.", e:{inc:8,leg:-5,coh:-5}, f:["gradual"],
       after:"An act is passed: no child born after this year will be bound, and all bonds will end in twenty years. Marcus calls it a schedule for patience. Many of the four thousand go home. Some don't.",
       fam:"{M} says twenty years is a long time to ask anyone to wait. {F} says it's better than never. They are both right."}
    ]},
  { id:"printer", era:3, year:38, type:"Speech", icon:"press", title:"The printer's case",
    w:h=>1+((h.has("civilRights")&&!h.has("courts"))?4:0)+(h.has("minimalRights")?4:0)+(h.has("junta")||h.has("dynasty")?3:0),
    cause:h=>h.has("minimalRights")?"Arrived because the founding document promises no protection for speech.":(h.has("civilRights")&&!h.has("courts"))?"Arrived because speech is promised and nothing enforces the promise.":"Arrived because power is always tempted to silence its critics.",
    story:h=>`<p>A printer named Osric published a pamphlet accusing a senior official of selling offices. The accusation is detailed, specific, and — most people suspect — true. Osric was arrested at his press the next morning and his type was confiscated.</p><p>${h.has("minimalRights")?"Nothing in the founding document says he can't be.":h.has("civilRights")?"The founding document promises freedom of speech. Whether anything enforces that promise is about to be tested.":"The founding document says nothing about speech either way."}</p><p>{D} has a copy of the pamphlet. She read it aloud to {M}, who listened with her eyes closed and said, "Well, now we'll find out what kind of country this is."</p>`,
    insp:"Inspired by the Zenger trial, the Sedition Act of 1798, and the Peterloo-era prosecutions of radical printers.",
    choices:[
      {l:"Let the courts hear it — truth is a defence", c:"A precedent for a free press. The official will be exposed.", e:{inst:15,leg:10}, f:["pressFree"],
       after:"A jury acquits Osric in forty minutes. The official resigns. Every printer in the nation reads the verdict and orders more paper.",
       fam:"{D} keeps the pamphlet in her desk for the rest of her life, next to the verdict."},
      {l:"Let the government decide the matter", c:"The official's colleagues will judge the case.", e:{inst:-10,leg:-10}, f:["pressCowed"],
       after:"Osric is fined into bankruptcy. No one prints the next pamphlet, though people are thinking it.",
       fam:"{D} burns her copy, on {M}'s advice. She regrets it for years."},
      {l:"Release Osric quietly and investigate the official", c:"A fair outcome, with no rule behind it.", e:{leg:5},
       after:"Osric is released without charge. The investigation finds some irregularities. The next printer to be arrested has no precedent to cite.",
       fam:"{M} says that's what happens when you rely on a good man in the right office. {D} asks what happens when there isn't one."}
    ]}
];


// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
const rnd = a => a[Math.floor(Math.random()*a.length)];
const clamp = v => Math.max(0, Math.min(100, v));
const ROLE_IDX = {F:0,M:1,S:2,D:3};

const ONES=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
const TENS=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
function words(n){ if(n<20) return ONES[n]; if(n<100) return TENS[Math.floor(n/10)]+(n%10?"-"+ONES[n%10]:""); return "a hundred"+(n>100?" and "+words(n-100):""); }

const first = r => state.family.members[ROLE_IDX[r]].name;
const ageAt = (r, year) => state.family.members[ROLE_IDX[r]].age + year - 1;
const H = () => ({ has:f=>state.flags.has(f), geo:t=>state.nation.tags.includes(t), fam:state.family, m:state.m });

function T(s){
  const f = state.family;
  return s
    .replace(/\[\[([\s\S]*?)\|\|([\s\S]*?)\]\]/g, (_,a,b)=> f.landed?a:b)
    .replace(/\{(\w+)\}/g, (m,k)=>{
      if(k in ROLE_IDX) return first(k);
      if(/^[FMSD]age$/.test(k)) return words(ageAt(k[0], state.year));
      if(k==="fam") return f.surname;
      if(k==="nation") return state.nation.name;
      if(f[k]!==undefined) return f[k];
      if(k.endsWith("Cap")&&typeof f[k.slice(0,-3)]==="string"){ const v=f[k.slice(0,-3)]; return v[0].toUpperCase()+v.slice(1); }
      return m;
    });
}
function applyEffects(e){ for(const k in (e||{})) state.m[k] = clamp(state.m[k] + e[k]); }
function addFlags(list){ (list||[]).forEach(f=>{ state.flags.add(f); if(!(f in state.flagYear)) state.flagYear[f]=state.year; }); }

// ═══════════════════════════════════════════════════════════
// STATE TRANSITIONS
// ═══════════════════════════════════════════════════════════
function newState(nation, family){
  return { nation, family, qi:0, answers:[], m:{}, flags:new Set(), flagYear:{}, year:1,
           era:1, queue:[], ci:0, used:new Set(), log:[], snapshots:{}, pending:null, phase:"intro" };
}
// Recompute the nation from all ten answers (so going back to change an answer is safe)
function ratifyState(){
  state.m = {...state.nation.base}; state.flags = new Set(); state.flagYear = {}; state.year = 1; state.log = [];
  QUESTIONS.forEach((q,i)=>{
    const c=q.choices[state.answers[i]];
    applyEffects(c.e);
    state.nation.tags.forEach(t=>{ if(c.g&&c.g[t]) applyEffects(c.g[t]); });
    addFlags(c.f);
    state.log.push({k:q.cat, v:c.l});
  });
  if(state.family.sonSoldier) addFlags(["S_soldier"]);
  state.snapshots[1] = {...state.m};
}
function applyCrisisChoice(cr, i){
  const c=cr.choices[i];
  applyEffects(c.e); addFlags(c.f);
  if(c.ff) addFlags(c.ff[state.family.landed?"landed":"landless"]);
  state.log.push({k:`Year ${cr.year}`, v:T(c.l), t:cr.title});
  return c;
}
const activeFaults = () => { const h=H(); return FAULTS.filter(f=>f.w(h)).map(f=>T(f.t)); };

function foundingSentence(){
  const s = QUESTIONS.map((q,i)=>q.choices[state.answers[i]].s);
  return `${state.nation.name} begins its life ${s[0]}, with ${s[1]}. It is founded on ${s[2]}, with ${s[3]}, and settles its disputes through ${s[4]}. It is ${s[5]}, has ${s[6]}, and is ${s[7]}, ${s[8]}, ${s[9]}.`;
}

function pickCrises(era){
  const h=H();
  const pool=CRISES.filter(c=>c.era===era&&!state.used.has(c.id)).map(c=>({c,w:c.w(h)})).filter(x=>x.w>0);
  const out=pool.filter(x=>x.w>=100).sort((a,b)=>a.c.year-b.c.year).slice(0,2).map(x=>x.c);
  let rest=pool.filter(x=>x.w<100);
  while(out.length<2&&rest.length){
    let r=Math.random()*rest.reduce((s,x)=>s+x.w,0), i=0;
    while(r>rest[i].w){ r-=rest[i].w; i++; }
    out.push(rest[i].c); rest.splice(i,1);
  }
  return out.sort((a,b)=>a.year-b.year);
}

// ═══════════════════════════════════════════════════════════
// FAMILY FATES — scores read the nation's meters and flags
// ═══════════════════════════════════════════════════════════
function scores(){
  const m=state.m, h=H(), f=state.family;
  const edu = h.has("publicEd")?30:h.has("hybridEd")?(f.landed?24:18):h.has("churchServices")?18:h.has("privateEd")?(f.landed?16:6):6;
  return {
    F: m.eq*.5+m.pros*.5+(f.landed?8:-6)+(h.has("F_ownsLand")?12:0)+(h.has("reliefPrecedent")?5:0)-(h.has("consolidation")?8:0),
    M: m.inc*.5+m.inst*.3+m.leg*.2+(h.has("universalVote")?12:0)-((h.has("propertyVote")||h.has("landedCitizens"))&&!h.has("universalVote")?8:0)-(h.has("motherFever")?5:0),
    S: m.eq*.4+m.leg*.4+m.pros*.2+(h.has("unions")?10:0)+(h.has("arbitration")?5:0)-(h.has("strikeBroken")?10:0)+(h.has("veteransHonored")&&h.has("S_soldier")?8:0),
    D: edu+m.inc*.4+m.eq*.2-(h.has("schoolsLost")?15:0)+(h.has("oversight")?5:0)+(h.has("pressFree")?3:0)+(h.has("universalVote")?4:0)
  };
}
const tier = (v,hi,lo) => v>=hi?2:v>=lo?1:0;
const TH = {F:[58,44], M:[50,38], S:[56,42], D:[60,44]};

function vignette(r){
  const h=H(), sc=scores(), t=tier(sc[r],...TH[r]);
  if(r==="F"){
    if(h.has("F_lostLand")) return "Works in a city warehouse now. On Sundays he walks to the edge of town, where you can see fields.";
    if(!state.family.landed&&h.has("F_ownsLand")) return "Owns land. He says it to himself sometimes, like a man testing a tooth.";
    return ["Still works [[{Fhold}||the leased field]], and owes more on it every year.","Still works [[{Fhold}||the leased field]]. His hands are slower; the work is not.","[[{FholdCap} has paid for itself twice over.||Has saved enough to make an offer on the field he leases.]] He has begun, cautiously, to enjoy things."][t];
  }
  if(r==="M"){
    if(h.has("motherFever")) return "Still {MworkNow}, though the stairs cost her more breath than they used to.";
    return ["Still {MworkNow}, and keeps her opinions for the kitchen, where no one with power can hear them.","Still {MworkNow}. Men in the district have started asking her opinion — usually after they've already decided.","Sits on the district relief committee. Men who used to talk over her now wait for her to finish."][t];
  }
  if(r==="S"){
    if(h.has("S_radical")) return "Has been arrested twice. He mentions it the way other men mention their trade.";
    if(h.has("S_soldier")) return "Carries the war in his left leg and somewhere else he won't name. Works when he can.";
    return ["Works at {Swork} for wages that buy a little less every year.","Works at {Swork}, steady, and has married. He reads the newspaper with a pencil in his hand.","Is a foreman at {Swork} and is saving to start something of his own."][t];
  }
  if(h.has("schoolsLost")) return "Teaches herself from borrowed books, since there is no longer a school to teach her.";
  return ["Works, as most girls her age do. She reads at night by a candle she pays for herself.","Has finished what schooling there is and is fighting for the next step.","Is studying in the capital. Her letters home are full of words her father has to look up."][t];
}

function fate(r){
  const h=H(), f=state.family, sc=scores(), t=tier(sc[r],...TH[r]), m=state.m;
  if(r==="F"){
    const dy = 40 + Math.max(0, Math.min(9, Math.round((m.pros+m.eq)/20) - (h.has("F_lostLand")?3:0)));
    const da = ageAt("F", dy);
    const pre = `{F} {fam} died in Year ${dy}, at ${words(da)}. `;
    if(h.has("F_lostLand")) return pre+"His last years were spent in a rented room four streets from the warehouse where he worked. He kept a jar of soil from [[{Fhold}||the old field]] on the windowsill. No one threw it out for a long time afterwards.";
    if(!f.landed&&h.has("F_ownsLand")) return pre+"He died on land he owned. It was not forty acres; it was nineteen. He said nineteen was a number a man could die content with, and as far as anyone could tell, he did.";
    return pre+[
      "He had done everything the founders asked of a citizen. He died owing more than he owned. Near the end he told {S} he had expected the arithmetic to come out differently.",
      "He worked [[{Fhold}||another man's land]] until two winters before the end, and spent those two arguing with the newspaper. He believed in the nation to the last. He was not always sure it believed in him.",
      "[[{FholdCap} passed to his children free of debt.||He died a tenant, but with the rent paid a year ahead and money in the bank.]] At his funeral a man none of the family recognised stood up and said {F} had once helped him through a bad year and never asked to be repaid. {M} said that sounded like him."][t];
  }
  if(r==="M"){
    const dy = 41 + Math.max(0, Math.min(8, Math.round((m.pros+m.eq)/20) - (h.has("motherFever")?4:0)));
    const da = ageAt("M", dy);
    const pre = `{M} {fam} died in Year ${dy}, at ${words(da)}. `;
    if(h.has("universalVote")&&dy>state.flagYear.universalVote) return pre+`She voted in every election from Year ${state.flagYear.universalVote} until she died, and was never once late. She said she had waited long enough already.`;
    if(h.has("motherFever")) return pre+"The fever she caught in the harbour summer came back every winter, a little stronger each time. She {Mwork} through all of them.";
    return pre+[
      "No one who could act on her opinions ever asked for them. She had a great many. Her daughter wrote some of them down.",
      "She {Mwork} for forty years, and her name appears in the district records only once: as wife of {F}. Those who knew her say it is the least accurate line ever written about her.",
      "In her last decade she sat on the district relief committee — the same office whose clerk had once written her name in a book and sent her home. She made sure the clerks wrote down what they did next."][t];
  }
  if(r==="S"){
    const pre = `{S} {fam} is ${words(ageAt("S",50))}. `;
    if(h.has("civilWar")) return pre+"He fought in the war that began in Year 35 — the war the founders wrote into the first document without meaning to. He will not say which side he would choose now. He says there should not have been sides.";
    if(h.has("S_blacklisted")) return pre+"He never worked at {Swork} again after the strike. He drove a carter's wagon for thirty years instead. His son is a foreman at {Swork} now, and pays the union rate, and visits on Sundays.";
    if(h.has("veteransBetrayed")&&h.has("S_soldier")) return pre+"He still has his discharge papers, and the letter from the land office, in the same drawer as his medal. Every few years a journalist comes to ask about it. He always talks to them.";
    if(h.has("S_radical")&&(h.has("unions")||h.has("universalVote")||h.has("abolished"))) return pre+"He was arrested five times; the fifth time, a judge younger than his own son apologised to him. The movement he joined as a young man won about half of what it asked for. He says half is what you get when you ask for everything.";
    if(h.has("S_radical")) return pre+"He was arrested five times and won nothing he can point to. His grandchildren think he is a fool, and then, one by one, start going to meetings.";
    return pre+[
      `He owns nothing. He worked for forty years — good, skilled work — and the nation never made a place for a man like him to keep what he built. He remembers being ${words(f.members[2].age)} and thinking the nation was new enough to make room for him. He thinks about that sometimes, in the mornings.`,
      "He worked at {Swork} for forty years and has a pension that covers most of what he needs. He votes, and complains, and votes again. He is, he says, about as satisfied as a man should let himself be.",
      "He runs his own shop with six workers, and pays them what the union says, because he remembers. His grandchildren think he is boring. He has decided this is what success looks like."][t];
  }
  // D
  const pre = `{D} {fam} is ${words(ageAt("D",50))}. She `;
  const tail = h.has("yusufLeft")?" She still has Amara's last letter.":h.has("yusufCitizen")?" Amara is the godmother of her eldest.":"";
  const good = m.inc>=60&&m.leg>=55&&!h.has("junta");
  const closing = ` Her granddaughter asked her recently what the nation was for. {D} said: at its best, it is for making sure that the life you can build is limited by what you are willing to do — not by who you were born to. Her granddaughter asked whether it is at its best now. ${good?"{D} thought about it. \"Closer,\" she said. \"Closer than it was.\"":"\"Not yet,\" {D} said. \"I am going to the meeting on Thursday. You can come if you want.\""}`;
  return pre+[f.dLow,f.dMid,f.dHigh][t]+"."+tail+closing;
}

function verdict(){
  const h=H(), m=state.m, n=state.nation.name;
  const avg = METERS.reduce((s,x)=>s+m[x.k],0)/METERS.length;
  if(h.has("civilWar")) return {t:`${n}: the war in the founding`, p:`In Year 35, ${n} went to war with itself over the question its founders declined to answer. The war ended; the question did not. Fifty years on, the nation is two peoples who share a flag and very little else.`};
  if(h.has("junta")) return {t:`${n}: the general's peace`, p:`The army kept order after the founder died, and it is keeping order still. The founding document is displayed in a glass case in the capital, where it is admired and not consulted.`};
  if(h.has("dynasty")) return {t:`${n}: an inheritance`, p:`The founders' seats passed to their sons, and their sons' sons. ${n} is stable, and polite, and owned. The people who notice tend to leave.`};
  if(h.has("coerced")&&!h.has("abolished")&&!h.has("gradual")) return {t:`${n}: the lie it maintains`, p:`${n} is prosperous in the way that only a nation built on unpaid labour can be — prosperous for some. Its founding document is read aloud every independence day, by people who have learned not to hear one of its words.`};
  if(h.has("abolished")&&h.has("coerced")) return {t:`${n}: the promise kept late`, p:`${n} kept its first promise late, at great cost, and under pressure from the people it had broken it to. Its histories now call that moment the second founding. The people who lived through it called it something less tidy.`};
  if(m.pros>=65&&m.eq<35) return {t:`${n}: rich, and walled`, p:`${n} is wealthy. You can see it from the harbour, and from the great houses on the ridge. You can also see, if you look, the people who built them, still living below the ridge.`};
  if(m.pros<35&&m.eq>=60) return {t:`${n}: fair, and poor`, p:`${n} shares what it has more evenly than almost any nation on earth. It does not have very much. Its young people argue about whether that is a virtue or an excuse, and a great many of them leave to find out.`};
  if(m.coh<35) return {t:`${n}: a quarrelling union`, p:`${n} still exists, which some years seemed unlikely. Its provinces argue, its factions argue, its newspapers argue. It is not peaceful. It may, in its loud way, be free.`};
  if(m.inst<35) return {t:`${n}: good intentions, weak walls`, p:`${n} was founded by good people and has been governed by people of every kind since. Without sturdy institutions it has depended, each decade, on luck. Its luck has been mixed.`};
  if(avg>=60) return {t:`${n}: a nation that made room`, p:`${n} is not finished — no nation is — but it has become the kind of place where a tenant's daughter can sit where the founders sat. Its founders would not recognise it. Most of them would, eventually, approve.`};
  return {t:`${n}: unfinished`, p:`${n} is neither the nation its founders feared nor the one they hoped for. It is a place still arguing over what it promised, which is perhaps the best a nation can manage: an argument that never quite ends, conducted mostly in good faith.`};
}

