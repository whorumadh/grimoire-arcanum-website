document.addEventListener('DOMContentLoaded', function() {
    // --- Código de la barra de navegación (Navbar Logic) ---
    const header = document.querySelector('header');
    const logoContainer = document.querySelector('.logo-container');
    const nav = document.getElementById('main-nav');
    const mainLogo = document.getElementById('main-logo');

    const tabletAndMobileMediaQuery = window.matchMedia('(max-width: 768px)');

    function enableDesktopHoverLogic() {
        mainLogo.removeEventListener('click', toggleNavOnClick);
        document.removeEventListener('click', closeNavOnOutsideClick);
        nav.querySelectorAll('a').forEach(link => {
            link.removeEventListener('click', closeNavOnLinkClick);
        });

        logoContainer.style.opacity = 1;
        nav.style.opacity = 0;
        nav.classList.remove('show');

        header.addEventListener('mouseenter', handleMouseEnter);
        header.addEventListener('mouseleave', handleMouseLeave);

        mainLogo.style.cursor = 'default';
    }

    function enableMobileClickLogic() {
        header.removeEventListener('mouseenter', handleMouseEnter);
        header.removeEventListener('mouseleave', handleMouseLeave);

        logoContainer.style.opacity = 1;
        nav.style.opacity = 0;
        nav.classList.remove('show');
        nav.style.top = '';
        nav.style.left = '';
        nav.style.transform = '';

        mainLogo.addEventListener('click', toggleNavOnClick);
        document.addEventListener('click', closeNavOnOutsideClick);
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeNavOnLinkClick);
        });

        mainLogo.style.cursor = 'pointer';
    }

    function handleMouseEnter() {
        logoContainer.style.opacity = 0;
        nav.style.opacity = 1;
        nav.style.pointerEvents = 'auto';
    }

    function handleMouseLeave() {
        logoContainer.style.opacity = 1;
        nav.style.opacity = 0;
        nav.style.pointerEvents = 'none';
    }

    function toggleNavOnClick() {
        nav.classList.toggle('show');
    }

    function closeNavOnOutsideClick(event) {
        if (!mainLogo.contains(event.target) && !nav.contains(event.target)) {
            if (nav.classList.contains('show')) {
                nav.classList.remove('show');
            }
        }
    }

    function closeNavOnLinkClick() {
        if (nav.classList.contains('show')) {
            nav.classList.remove('show');
        }
    }

    function checkMediaQuery() {
        if (tabletAndMobileMediaQuery.matches) {
            enableMobileClickLogic();
            console.log('Modo Tablet/Móvil: Interacción por clic.');
        } else {
            enableDesktopHoverLogic();
            console.log('Modo Desktop: Interacción por hover.');
        }
    }

    checkMediaQuery();
    tabletAndMobileMediaQuery.addListener(checkMediaQuery);

    // --- FIN DEL CÓDIGO DE LA BARRA de NAVEGACIÓN ---


    // --- INICIO DEL CÓDIGO DE SPELLS PAGE ---

    // Select DOM Elements
    const spellsGrid = document.getElementById('spells-grid');
    const spellModal = document.getElementById('spell-modal');
    const modalSpellDetails = document.getElementById('modal-spell-details');
    const closeButton = document.querySelector('.close-button');
    const searchBar = document.getElementById('search-bar');
    const classFilter = document.getElementById('class-filter');
    const schoolFilter = document.getElementById('school-filter');
    const loadingIndicator = document.getElementById('loading-indicator');

    // Variable para almacenar todos los cantrips cargados
    let allCantrips = [];

    // API Endpoint
    const API_BASE_URL = 'https://www.dnd5eapi.co';

    // Function to Handle Search
    function handleSearch() {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedClass = classFilter.value;
        const selectedSchool = schoolFilter.value;

        let filteredResults = allCantrips.filter(spell => {
            const matchesSearch = spell.name.toLowerCase().includes(searchTerm);
            
            const matchesClass = selectedClass === "" || spell.classes.some(cls => cls.index === selectedClass);
            const matchesSchool = selectedSchool === "" || spell.school.index === selectedSchool;

            return matchesSearch && matchesClass && matchesSchool;
        });

        if (filteredResults.length > 0) {
            renderSpellCards(filteredResults);
        } else {
            spellsGrid.innerHTML = '<p class="info-message">No se encontraron conjuros que coincidan con tu búsqueda y filtros.</p>';
        }
    }

// Function to Populate Filters
    function populateFilters(cantrips) {
        const classesSet = new Set(); 
        const schoolsSet = new Set();

        cantrips.forEach(spell => {
            // Añadir clases
            spell.classes.forEach(cls => {
                classesSet.add(JSON.stringify({ name: cls.name, index: cls.index }));
            });
            // Añadir escuelas
            schoolsSet.add(JSON.stringify({ name: spell.school.name, index: spell.school.index }));
        });

        const sortedClasses = Array.from(classesSet).map(str => JSON.parse(str)).sort((a, b) => a.name.localeCompare(b.name));
        const sortedSchools = Array.from(schoolsSet).map(str => JSON.parse(str)).sort((a, b) => a.name.localeCompare(b.name));

        classFilter.innerHTML = '<option value="">All classes</option>';
        schoolFilter.innerHTML = '<option value="">All schools</option>'; 


        // Rellenar el filtro de Clases
        sortedClasses.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.index;
            option.textContent = cls.name;
            classFilter.appendChild(option);
        });

        // Rellenar el filtro de Escuelas
        sortedSchools.forEach(school => {
            const option = document.createElement('option');
            option.value = school.index;
            option.textContent = school.name;
            schoolFilter.appendChild(option);
        });
    }

    // Function to Render Spell Cards (Reduced View)
    function renderSpellCards(spells) {
        spellsGrid.innerHTML = '';
        spells.forEach(spell => {
            const spellCard = document.createElement('div');
            spellCard.classList.add('spell-card-reduced');
            spellCard.dataset.spellUrl = spell.url;

            const schoolIcon = getSchoolIcon(spell.school.name);

            spellCard.innerHTML = `
                <div class="spell-icon-container">
                    ${schoolIcon}
                </div>
                <h3 class="spell-name-reduced">${spell.name}</h3>
            `;
            spellsGrid.appendChild(spellCard);

            spellCard.addEventListener('click', () => openSpellModal(spell.url));
        });
    }

    // Helper function to get school icon (placeholder)
    function getSchoolIcon(schoolName) {
        switch (schoolName.toLowerCase()) {
            case 'abjuration': return '<img src="../files/icons/abjuration.png" alt="Abjuration Icon">';
            case 'conjuration': return '<img src="../files/icons/conjuration.png" alt="Conjuration Icon">';
            case 'divination': return '<img src="../files/icons/divination.png" alt="Divination Icon">';
            case 'enchantment': return '<img src="../files/icons/enchantment.png" alt="Enchantment Icon">';
            case 'evocation': return '<img src="../files/icons/evocation.png" alt="Evocation Icon">';
            case 'illusion': return '<img src="../files/icons/illusion.png" alt="Illusion Icon">';
            case 'necromancy': return '<img src="../files/icons/necromancy.png" alt="Necromancy Icon">';
            case 'transmutation': return '<img src="../files/icons/transmutation.png" alt="Transmutation Icon">';
            default: return '<img src="../files/icons/default.png" alt="Default Spell Icon">'; // Fallback
        }
    }

    // Function to Open Modal with Full Spell Details
    async function openSpellModal(spellUrl) {
        try {
            const response = await fetch(`${API_BASE_URL}${spellUrl}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const spell = await response.json();

            modalSpellDetails.innerHTML = `
                <div class="modal-spell-header">
                    <div class="modal-spell-icon-container">
                        ${getSchoolIcon(spell.school.name)}
                    </div>
                    <h2>${spell.name}</h2>
                    <p>${spell.level === 0 ? 'Cantrip' : spell.level + (spell.level === 1 ? 'st' : spell.level === 2 ? 'nd' : spell.level === 3 ? 'rd' : 'th')}-level ${spell.school.name} ${spell.ritual ? '(ritual)' : ''}</p>
                </div>
                <div class="modal-spell-stats">
                    <p><strong>Casting Time:</strong> ${spell.casting_time}</p>
                    <p><strong>Range:</strong> ${spell.range}</p>
                    <p><strong>Components:</strong> ${spell.components.join(', ')} ${spell.material ? `(${spell.material})` : ''}</p>
                    <p><strong>Duration:</strong> ${spell.duration}</p>
                </div>
                <div class="modal-spell-description">
                    ${spell.desc.map(p => `<p>${p}</p>`).join('')}
                    ${spell.higher_level ? spell.higher_level.map(p => `<p><strong>At Higher Levels:</strong> ${p}</p>`).join('') : ''}
                </div>
                <div class="modal-spell-classes">
                    <p><strong>Classes:</strong> ${spell.classes.map(cls => cls.name).join(', ')}</p>
                </div>
            `;

            spellModal.style.display = 'flex';
        } catch (error) {
            console.error("Error fetching spell details for modal:", error);
            modalSpellDetails.innerHTML = '<p class="error-message">Failed to load spell details.</p>';
            spellModal.style.display = 'flex';
        }
    }

    // Function to Close Modal
    function closeSpellModal() {
        spellModal.style.display = 'none';
        modalSpellDetails.innerHTML = '';
    }

    closeButton.addEventListener('click', closeSpellModal);

    spellModal.addEventListener('click', (event) => {
        if (event.target === spellModal) {
            closeSpellModal();
        }
    });

    // Function to Fetch Cantrips
async function fetchCantrips() {
    console.log('fetchCantrips is running...');

    // --- Muestra el indicador al inicio de la carga ---
    loadingIndicator.classList.remove('hidden');
    spellsGrid.innerHTML = '';

    try {
        const response = await fetch(`${API_BASE_URL}/api/spells`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Initial spell list from API:', data.results.length, data.results);

        const allSpellUrls = data.results;
        const cantripsFound = [];

        const CONCURRENT_REQUESTS = 8;
        const DELAY_BETWEEN_BATCHES = 80;

        console.log(`Starting detailed fetch for spells with ${CONCURRENT_REQUESTS} concurrent requests and ${DELAY_BETWEEN_BATCHES}ms delay between batches...`);

        for (let i = 0; i < allSpellUrls.length; i += CONCURRENT_REQUESTS) {
            const batch = allSpellUrls.slice(i, i + CONCURRENT_REQUESTS);

            const batchPromises = batch.map(async (spell) => {
                try {
                    const detailResponse = await fetch(`${API_BASE_URL}${spell.url}`);
                    if (!detailResponse.ok) {
                        console.warn(`Failed to fetch details for ${spell.name}: status ${detailResponse.status}. Skipping.`);
                        return null; 
                    }
                    const detailedSpell = await detailResponse.json();
                    return detailedSpell;
                } catch (detailError) {
                    console.error(`Error fetching details for ${spell.name}:`, detailError);
                    return null;
                }
            });

            const results = await Promise.all(batchPromises);

            results.forEach(detailedSpell => {
                if (detailedSpell && detailedSpell.level === 0) {
                    cantripsFound.push(detailedSpell);
                }
            });

            if (i + CONCURRENT_REQUESTS < allSpellUrls.length) {
                await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
            }
        }

        console.log('Total detailed spells processed:', allSpellUrls.length);
        console.log('Filtered cantrips (level 0):', cantripsFound.length, cantripsFound);

        if (cantripsFound.length === 0) {
            spellsGrid.innerHTML = '<p class="info-message">No se encontraron o cargaron conjuros de nivel 0 (cantrips).</p>';
        } else {
            allCantrips = cantripsFound;
            renderSpellCards(allCantrips);
        }

        populateFilters(allCantrips);


        if (searchBar) {
            searchBar.addEventListener('input', handleSearch);
        } else {
            console.error("Error: La barra de búsqueda con ID 'search-bar' no fue encontrada en el DOM.");
        }

        classFilter.addEventListener('change', handleSearch);
        schoolFilter.addEventListener('change', handleSearch);

        // --- OCULTA el indicador de carga si todo salió bien ---
        loadingIndicator.classList.add('hidden'); 


    } catch (error) {
        console.error("Error fetching cantrips (initial call or unexpected):", error);
        spellsGrid.innerHTML = '<p class="error-message">Fallo al cargar los conjuros. Por favor, inténtalo de nuevo más tarde.</p>';
        // --- OCULTA el indicador de carga si hubo un error ---
        loadingIndicator.classList.add('hidden'); 
    }
}

    // --- Llamada inicial a fetchCantrips (AL FINAL del DOMContentLoaded para spells) ---
    fetchCantrips();

});