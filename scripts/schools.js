document.addEventListener('DOMContentLoaded', function() {

// --- INICIO DEL CÓDIGO DE SCHOOLS OF MAGIC PAGE ---

    const schoolsGrid = document.getElementById('schools-grid');
    const schoolModal = document.getElementById('school-modal');
    const closeSchoolModalButton = document.getElementById('close-school-modal-button');
    const modalSchoolDetails = document.getElementById('modal-school-details');

    const schoolsOfMagicData = [
        {
            name: "Abjuration",
            id: "abjuration",
            description: `Abjuration is arguably the oldest and most fundamental school of magic, born from the innate desire for protection and safety. From the earliest days, mages sought ways to shield themselves and their communities from harm, whether mundane or magical. This primal need gave rise to the first protective wards, energy deflection spells, and methods to suppress hostile magical effects. Over centuries, these rudimentary defenses evolved into the intricate and powerful abjurations known today.\n\n
            At its core, abjuration is the magic of defense, negation, and containment. Practitioners excel at creating magical barriers, ranging from invisible force fields that deflect arrows to shimmering wards that repel magical assaults. They are adept at dispelling or counteracting curses, enchantments, and harmful conditions, often purifying areas of malevolent influence. Their spells can also bind and hold creatures, prevent travel through magical means, or banish interlopers back to their planes of origin, ensuring security and control.\n\n
            An abjurer often serves as a fortress's magical architect, a caravan's protector, or a scholar dedicated to safeguarding ancient knowledge. Their spells manifest as shimmering glows, invisible walls, or sudden bursts of energy that nullify threats. While less overtly flashy than evocation or conjuration, the subtle power of abjuration is crucial for survival, allowing allies to stand firm against overwhelming odds and ensuring that dangerous forces remain contained and controlled.`
        },
        {
            name: "Conjuration",
            id: "conjuration",
            description: `The school of Conjuration stems from a profound understanding of the fabric of reality and the connections between different planes and dimensions. Ancient texts suggest its origins lie in rituals meant to bridge worlds, either to summon aid or to banish threats. Over time, these practices refined, allowing mages to precisely call forth or displace matter and energy, leading to the diverse array of summoning and creation spells seen today.\n\n
            Conjuration magic encompasses the summoning of creatures, objects, or raw elemental energy, as well as the instantaneous transportation of subjects across space. A conjurer can call forth fey spirits, celestial beings, fearsome demons, or loyal elementals to fight by their side, overwhelming foes with sheer numbers or specialized abilities. Beyond living beings, they can materialize food, water, temporary shelters, or even weapons out of thin air, proving invaluable in dire situations.\n\n
            Furthermore, the school includes teleportation, allowing mages to bypass physical obstacles, escape dangers, or lead rapid offensives. Their magic often manifests as swirling portals, bursts of light accompanying a sudden appearance, or the materialization of an effect from nowhere. Conjurers are masters of logistics and battlefield control, able to reshape encounters by bringing reinforcements or necessary supplies directly into the fray, making them formidable and unpredictable allies or enemies.`
        },
        {
            name: "Divination",
            id: "divination",
            description: `Divination is the pursuit of knowledge, a magical discipline born from humanity's innate curiosity and desire to understand the mysteries of the universe. From shamans interpreting animal entrails to sages gazing into crystal balls, the urge to glimpse the unseen, learn the unknown, and predict the future has driven its development. Early forms focused on interpreting natural phenomena, eventually evolving into sophisticated spells that tap directly into the cosmic web of information.\n\n
            At its core, divination seeks to reveal secrets, uncover truths, and gain insight. Its spells allow practitioners to detect hidden objects, locate missing persons, or discern the intentions of others. A skilled diviner can pierce through illusions, speak with animals or even the dead, gaining perspectives inaccessible by mundane means. They are the ultimate information brokers, capable of answering questions about distant lands, forgotten histories, or the true nature of powerful artifacts.\n\n
            While often subtle, the power of divination can be decisive, turning the tide of battles by revealing enemy movements or preventing catastrophes by foreseeing dire futures. Their magic often appears as a sudden flash of insight, a whispering voice, or a brief, vivid vision. Diviners are invaluable to explorers, strategists, and investigators, providing the crucial intelligence needed to navigate complex challenges and make informed decisions in a world full of secrets.`
        },
        {
            name: "Enchantment",
            id: "enchantment",
            description: `Enchantment magic delves into the subtle and profound art of influencing minds, emotions, and behaviors. Its history is tied to ancient bards, charismatic leaders, and manipulative sorcerers who understood the power of suggestion and persuasion, seeking to amplify these natural abilities through arcane means. Over millennia, what began as simple charms to elicit favor grew into complex spells capable of dominating wills or sparking powerful emotional responses.\n\n
            This school is unique in its focus on direct mental manipulation. Enchanters can instill overwhelming fear, inspire unwavering courage, or compel creatures to perform specific actions. Their magic can make enemies treat them as trusted friends, resolve disputes through magical persuasion, or render foes docile and harmless. It is the ultimate tool for social interaction, espionage, and control, allowing the caster to navigate complex political landscapes or avoid direct confrontation.\n\n
            An enchanter's magic is rarely overtly flashy; it works by subtly twisting perception and will. It might manifest as a persuasive glint in the eye, a voice imbued with unnatural authority, or a sudden, irresistible urge. This school demands a deep understanding of psychology and social dynamics, as its power lies not in physical destruction but in the ability to bend the minds of others, making friends out of foes and servants out of rivals.`
        },
        {
            name: "Evocation",
            id: "evocation",
            description: `Evocation is the most direct and often the most visually spectacular school of magic, focusing on channeling raw magical energy to create immediate and dramatic effects. Its origins lie in primal elemental worship and the early attempts of mages to mimic the destructive forces of nature – the crack of lightning, the roar of fire, the crashing waves of the sea. Over centuries, these raw manifestations were refined into precise and powerful spells of pure arcane force.\n\n
            Evocation spells are the essence of elemental power and destructive might. Practitioners can conjure blasts of searing fire, hurl bolts of devastating lightning, unleash concussive waves of force, or erect shimmering walls of ice or flame. They are the battle mages par excellence, capable of devastating swathes of enemies or targeting specific foes with precision. Their magic is often a direct extension of their will, manifesting as vibrant, visible energy.\n\n
            An evoker is a force to be reckoned with on the battlefield, able to turn the tide of combat through sheer magical firepower. Their spells are loud, bright, and impactful, lighting up the darkest dungeons and sending foes scattering. While sometimes criticized for their destructive nature, evokers are indispensable when brute force is needed, able to shape and wield elemental power with terrifying efficiency to overcome obstacles or crush resistance.`
        },
        {
            name: "Illusion",
            id: "illusion",
            description: `The school of Illusion is the art of deception, manipulating senses and perception rather than reality itself. Its origins are steeped in the cunning of tricksters and the need for camouflage in the wild, gradually evolving as mages learned to project false images, sounds, and even smells to mislead and misdirect. Early illusions might have been simple phantoms, but centuries of study have led to constructs so convincing they can fool the sharpest minds.\n\n
            Illusion magic works by tricking the observer's senses or mind, creating things that are not there, making real things seem to disappear, or altering perceptions of what truly exists. An illusionist can conjure a mirage of a vast army, make their footsteps eerily silent, mimic any voice, or create an invisible cloak that renders them unseen. Their power lies in making the unreal believable and the real indiscernible.\n\n
            An illusionist is a master of misdirection, often preferring to avoid direct confrontation in favor of confusion and trickery. Their spells manifest as shimmering distortions, whispers from unseen sources, or sudden, inexplicable disappearances. This school demands creativity and strategic thinking, allowing its practitioners to solve problems through cunning rather than brute force, turning appearances into powerful weapons and defenses.`
        },
        {
            name: "Necromancy",
            id: "necromancy",
            description: `Necromancy is arguably the most feared and misunderstood school of magic, dealing with the fundamental energies of life, death, and undeath. Its history is often whispered in dark tales of forbidden rituals and pacts, yet its roots also lie in ancient healing arts and the desire to extend life or comprehend its cessation. Over time, the focus shifted from simple life manipulation to the more controversial reanimation of the dead and the draining of life force.\n\n
            Necromantic spells primarily manipulate positive and negative energy. While infamous for raising the dead as skeletal or zombified servants, this school also includes spells that drain vitality from foes, weaken their spirits, or inflict insidious diseases. Conversely, some necromantic spells can mend wounds, restore lost vigor, or even stabilize those on the brink of death, showing its dual nature as both a force of decay and a protector of life.\n\n
            A necromancer often walks a solitary and controversial path, their magic seen as an affront to nature's cycles. Their spells can manifest as a chilling touch, a sickly green glow, or the unsettling creak of reanimated bones. Despite the stigma, the power of necromancy is undeniable, offering control over the ultimate transition, making its practitioners formidable wielders of both life-giving and death-dealing forces.`
        },
        {
            name: "Transmutation",
            id: "transmutation",
            description: `Transmutation is the school of change, fundamentally altering the physical properties of matter, energy, and even living beings. Its origins can be traced to early alchemists and artisans who sought to refine materials and improve tools, eventually discovering magical means to accelerate or enhance these transformations. From turning lead into gold to shaping wood with a thought, transmutation is about molding the tangible world to the caster's will.\n\n
            Transmutation spells can affect a vast range of properties: an object's hardness, density, color, or shape. A transmuter can transform a living creature into a harmless animal, enhance their own physical abilities with incredible speed or strength, turn water into air, or make an object levitate. Their magic is incredibly versatile, capable of solving practical problems, disarming foes by turning their weapons to dust, or aiding in construction and repair.\n\n
            A transmuter's magic is often subtle but deeply impactful, reshaping reality on a fundamental level. It might manifest as a shimmer of light over a changing object, a sudden alteration in a creature's form, or an unexpected shift in the environment. This school appeals to those who seek control over the physical world, offering limitless possibilities for utility, adaptation, and direct manipulation of the environment and its inhabitants.`
        }
    ];

    // Función para renderizar las tarjetas de las escuelas
    function renderSchoolCards(schools) {
        if (!schoolsGrid) return;
        schoolsGrid.innerHTML = '';

        schools.forEach(school => {
            const schoolCard = document.createElement('div');
            schoolCard.classList.add('school-card');
            
            // Asignar el ID de la escuela al dataset para el modal
            schoolCard.dataset.schoolId = school.id; 

            const imageUrl = `../files/school-images/${school.id}.avif`;

            schoolCard.innerHTML = `
                <img src="${imageUrl}" alt="${school.name} School Icon">
                <h3 class="school-name">${school.name}</h3>
            `;
            schoolsGrid.appendChild(schoolCard);

            // Abrir modal al hacer clic en la tarjeta
            schoolCard.addEventListener('click', () => openSchoolModal(school.id));
        });
    }

    // Función para abrir el modal de la escuela
function openSchoolModal(schoolId) {
    if (!schoolModal || !modalSchoolDetails) return; 

    const school = schoolsOfMagicData.find(s => s.id === schoolId); 

    if (school) { //
        const imageUrl = `../files/school-images/${school.id}.avif`;

        const paragraphsHtml = school.description.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('');

        modalSchoolDetails.innerHTML = `
            <h2>${school.name}</h2>
            <img src="${imageUrl}" alt="${school.name} School Image" class="modal-school-image"> ${paragraphsHtml} `;
        schoolModal.style.display = 'flex';
    } else {
        console.error(`School with ID ${schoolId} not found.`);
    }
}

    // Función para cerrar el modal de la escuela
    function closeSchoolModal() {
        if (schoolModal) {
            schoolModal.style.display = 'none';
            modalSchoolDetails.innerHTML = '';
        }
    }

    // Event Listeners para el modal
    if (closeSchoolModalButton) {
        closeSchoolModalButton.addEventListener('click', closeSchoolModal);
    }

    if (schoolModal) {
        schoolModal.addEventListener('click', (event) => {
            if (event.target === schoolModal) {
                closeSchoolModal();
            }
        });
    }

    // Llama a la función para renderizar las tarjetas cuando el DOM esté listo
    if (schoolsGrid) {
        renderSchoolCards(schoolsOfMagicData);
    }

    // --- FIN DEL CÓDIGO DE SHOOLS OF MAGIC PAGE ---
});