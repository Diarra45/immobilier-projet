// Loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }
});

// Burger menu
document.querySelector('.burger-menu')?.addEventListener('click', function() {
    document.querySelector('nav')?.classList.toggle('active');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Gallery animation
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.gallery-overlay').style.bottom = '0';
        item.querySelector('img').style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.gallery-overlay').style.bottom = '-100%';
        item.querySelector('img').style.transform = 'scale(1)';
    });
});

// Contact form
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Merci pour votre message, nous vous contacterons bientôt !');
    this.reset();
});

// Fonction pour convertir les URLs YouTube
function convertYouTubeUrl(url) {
    if (!url) return null;
    
    // Si c'est déjà un lien embed
    if (url.includes('youtube.com/embed')) return url.split('?')[0];
    
    // Si c'est un lien mobile
    if (url.includes('m.youtube.com')) {
        url = url.replace('m.youtube.com', 'youtube.com');
    }
    
    // Extraction de l'ID vidéo
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) 
        ? `https://www.youtube.com/embed/${match[2]}`
        : null;
}

// Properties data
const properties = [
    {
        id: 1,
        title: "Villa moderne avec piscine",
        description: "UN DUPLEX INACHEVÉ DE TYPE F8 EN VENTE A GRAND-BASSAM – MOCKEYVILLE SUR PERFECTOR IMMOBILIER.",
        price: "inconnu",
        image: "https://perfectorimmobilier.ci/wp-content/uploads/2022/10/311070027_183966027506631_7597525009088270854_n-1000x750.jpg",
        bedrooms: "inconnu",
        bathrooms: "inconnu",
        area: "inconnu",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: 2,
        title: "Maison à abidjan - yopougon maroc",
        description: "Maison inachevée construite sur un terrain de 300m2 à yopougon Maroc, non loin du carrefour du mouton.",
        price: "inconnu",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF0DelrhI_pFgurwgUoXQF25uv5QT9mpPE3w&s",
        bedrooms: "inconnu",
        bathrooms: "inconnu",
        area: "inconnu",
        video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Format classique
    },
    {
        id: 3,
        title: "Appartement à Bingerville",
        description: "Villa à découvrir",
        price: "3 000 000 FCFA (location), 10 millions (partenariat)",
        image: "images/images-9.jpg",
        bedrooms: "inconnu",
        bathrooms: "inconnu",
        area: "inconnu",
        video: "https://youtu.be/dQw4w9WgXcQ" // Format raccourci
    },
    {
        id: 4,
        title: "Appartement moderne en centre-ville",
        description: "UN DUPLEX INACHEVÉ DE TYPE F8 EN VENTE A GRAND-BASSAM – MOCKEYVILLE.",
        price: "inconnu",
        image: "https://perfectorimmobilier.ci/wp-content/uploads/2022/10/305401668_183965490840018_8355349374207220510_n-1000x750.jpg",
        bedrooms: "inconnu",
        bathrooms: "inconnu",
        area: "inconnu",
        video: "https://m.youtube.com/watch?v=02K3howZrng&pp=ygURbWFpc29uIGluYWNoZXbDqWU%3D" // Format mobile
    },
    {
        id: 5,
        title: "Appartement à louer à Cocody",
        description: "Appartement spacieux et lumineux à louer à Cocody.",
        price: "500 000 FCFA/mois",
        image: "https://example.com/image5.jpg",
        bedrooms: "3",
        bathrooms: "2",
        area: "120 m²",
        video: "https://m.youtube.com/watch?v=xlh-n2ii1M8&pp=ygURbWFpc29uIGluYXJjaGV2ZXLSBwkJ2ACjtWo3m0M%3D" // Avec paramètre
    },
    {
        id: 6,
        title: "Maison familiale à Abidjan",
        description: "Un R+2 inachevé avec piscine sur 300 m² à vendre à Ouaga2000 extension sud.",
        price: "150 000 000 FCFA",
        image: "https://media.bazarafrique.com/upload/post/623112dc1d5ba563659153.jpeg",
        bedrooms: "inconnu",
        bathrooms: "inconnu",
        area: "inconnu",
        video: "https://m.youtube.com/embed?v=xlh-n2ii1M8&pp=ygURbWFpc29uIGluYXJjaGV2ZXI%3D" // Format embed mobile
    }
];

// Fonction d'affichage des propriétés
function displayProperties() {
    const propertyContainer = document.getElementById('propertyContainer');
    if (!propertyContainer) return;
    
    // Vider le conteneur avant d'ajouter les propriétés
    propertyContainer.innerHTML = '';
    
    // Fusionner les propriétés par défaut avec celles du propriétaire
    const ownerProperties = JSON.parse(localStorage.getItem('ownerProperties')) || [];
    const allProperties = [...properties, ...ownerProperties];
    
    allProperties.forEach(property => {
        // Conversion de l'URL vidéo
        const videoUrl = convertYouTubeUrl(property.video);
        const hasVideo = videoUrl !== null;
        
        const propertyCard = document.createElement('div');
        propertyCard.className = 'property-card';
        
        propertyCard.innerHTML = `
            <div class="property-media">
                <div class="property-image-container">
                    <img src="${property.image}" alt="${property.title}" class="property-image" loading="lazy" 
                         onerror="this.src='https://via.placeholder.com/800x600?text=Image+non+disponible'">
                    ${hasVideo ? '<div class="play-icon"><i class="fas fa-play"></i></div>' : ''}
                </div>
                ${hasVideo ? `
                <div class="property-video-container">
                    <iframe src="${videoUrl}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                </div>
                ` : ''}
            </div>
            <div class="property-info">
                <h3>${property.title}</h3>
                <p>${property.description}</p>
                <div class="property-price">${property.price}</div>
                <div class="property-features">
                    <span><i class="fas fa-bed"></i> ${property.bedrooms}</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms}</span>
                    <span><i class="fas fa-ruler-combined"></i> ${property.area}</span>
                </div>
            </div>
        `;

        propertyCard.addEventListener('click', (e) => {
            if (!e.target.closest('.property-video-container')) {
                handlePropertyClick(property);
            }
        });

        propertyContainer.appendChild(propertyCard);
    });
}

// Gérer le clic sur une propriété
function handlePropertyClick(property) {
    const nom = prompt("Entrez votre nom :");
    if (!nom) return;
    
    const numero = prompt("Entrez votre numéro de téléphone :");
    if (!numero) return;

    const visite = {
        nom: nom.trim(),
        numero: numero.trim(),
        bien: property.title,
        date: new Date().toLocaleString()
    };

    const visites = JSON.parse(localStorage.getItem('visites')) || [];
    visites.push(visite);
    localStorage.setItem('visites', JSON.stringify(visites));

    alert(`Merci ${nom}, nous avons bien enregistré votre intérêt pour "${property.title}".`);
}

/***********************
 * AUTHENTIFICATION PROPRIÉTAIRE *
 ***********************/
const OWNER_CODES = ["PROP123", "OWNER456", "diarra"]; // Codes d'accès

// Vérifie l'authentification
function checkAuth() {
    return localStorage.getItem('ownerAuthenticated') === 'true';
}

// Authentifie le propriétaire
function authenticateOwner() {
    if (checkAuth()) {
        initOwnerPanel();
        return true;
    }
    
    const code = prompt("🔒 Entrez votre code propriétaire :");
    if (!code) return false;
    
    if (OWNER_CODES.includes(code)) {
        localStorage.setItem('ownerAuthenticated', 'true');
        initOwnerPanel();
        return true;
    } else {
        alert("❌ Code incorrect. Accès refusé.");
        return false;
    }
}

// Déconnexion
function ownerLogout() {
    localStorage.removeItem('ownerAuthenticated');
    
    const panel = document.getElementById('owner-panel');
    if (panel) {
        panel.classList.remove('active');
        // Attendre la fin de l'animation pour supprimer l'élément
        setTimeout(() => {
            if (panel && panel.parentNode) {
                panel.parentNode.removeChild(panel);
            }
        }, 300); // 300ms correspond à la durée de transition CSS
    }
    
    toggleOwnerButton(true);
    
    alert("Vous avez été déconnecté avec succès.");
}

/***********************
 * INTERFACE PROPRIÉTAIRE *
 ***********************/
function initOwnerPanel() {
    // Supprimer le panneau existant s'il y en a un
    const existingPanel = document.getElementById('owner-panel');
    if (existingPanel) {
        existingPanel.parentNode.removeChild(existingPanel);
    }
    
    // Créer le nouveau panneau
    const panel = document.createElement('div');
    panel.id = 'owner-panel';
    panel.innerHTML = `
        <div class="owner-header">
            <h3>Espace Propriétaire</h3>
            <button id="owner-close-btn">×</button>
        </div>
        <div class="owner-content">
            <button id="add-property-btn">➕ Ajouter une propriété</button>
            <form id="property-form" style="display:none;">
                <input type="text" id="property-title" placeholder="Titre" required>
                <textarea id="property-desc" placeholder="Description" required></textarea>
                <input type="text" id="property-price" placeholder="Prix" required>
                <input type="text" id="property-img" placeholder="URL Image" required>
                <input type="text" id="property-video" placeholder="URL Vidéo YouTube">
                <div class="form-actions">
                    <button type="submit">Enregistrer</button>
                    <button type="button" id="cancel-form">Annuler</button>
                </div>
            </form>
            <div class="visits-section">
                <h4>Demandes de visites</h4>
                <div id="visits-list"></div>
            </div>
            <div class="properties-section">
                <h4>Vos propriétés</h4>
                <div id="owner-properties-list"></div>
            </div>
        </div>
    `;
    document.body.appendChild(panel);
    
    // Ajouter la classe active après l'ajout au DOM pour permettre l'animation
    setTimeout(() => {
        panel.classList.add('active');
    }, 10);
    
    // Gestion des événements
    document.getElementById('owner-close-btn').addEventListener('click', ownerLogout);
    document.getElementById('add-property-btn').addEventListener('click', () => {
        document.getElementById('property-form').style.display = 'block';
    });
    document.getElementById('cancel-form').addEventListener('click', () => {
        document.getElementById('property-form').style.display = 'none';
        document.getElementById('property-form').reset();
    });
    document.getElementById('property-form').addEventListener('submit', handlePropertySubmit);
    
    loadOwnerProperties();
    loadVisits();
    setupPanelStyles();
    
    // Cacher le bouton d'accès propriétaire
    toggleOwnerButton(false);
}

// Chargement des visites
function loadVisits() {
    const visites = JSON.parse(localStorage.getItem('visites')) || [];
    const listContainer = document.getElementById('visits-list');
    
    if (!listContainer) return;
    
    if (visites.length === 0) {
        listContainer.innerHTML = '<p>Aucune demande de visite pour le moment</p>';
        return;
    }
    
    listContainer.innerHTML = '';
    
    visites.forEach((visite, index) => {
        const visiteElement = document.createElement('div');
        visiteElement.className = 'visit-item';
        visiteElement.innerHTML = `
            <div class="visit-info">
                <p><strong>${visite.nom}</strong> (${visite.numero})</p>
                <p>Bien: ${visite.bien}</p>
                <p>Date: ${visite.date}</p>
            </div>
            <div class="visit-actions">
                <button class="delete-visit" data-index="${index}">🗑️</button>
            </div>
        `;
        listContainer.appendChild(visiteElement);
        
        visiteElement.querySelector('.delete-visit').addEventListener('click', () => {
            deleteVisit(index);
        });
    });
}

// Suppression d'une visite
function deleteVisit(index) {
    if (!confirm("Supprimer cette demande de visite ?")) return;
    
    const visites = JSON.parse(localStorage.getItem('visites')) || [];
    visites.splice(index, 1);
    localStorage.setItem('visites', JSON.stringify(visites));
    
    loadVisits();
}

/***********************
 * GESTION DES PROPRIÉTÉS *
 ***********************/
function handlePropertySubmit(e) {
    e.preventDefault();
    
    const propertyForm = document.getElementById('property-form');
    const isEdit = propertyForm.dataset.editing === 'true';
    const editId = isEdit ? parseInt(propertyForm.dataset.editId) : null;
    
    const newProperty = {
        id: isEdit ? editId : Date.now(),
        title: document.getElementById('property-title').value,
        description: document.getElementById('property-desc').value,
        price: document.getElementById('property-price').value,
        image: document.getElementById('property-img').value,
        video: document.getElementById('property-video').value,
        bedrooms: "inconnu",
        bathrooms: "inconnu",
        area: "inconnu"
    };
    
    let ownerProperties = JSON.parse(localStorage.getItem('ownerProperties')) || [];
    
    if (isEdit) {
        // Remplacer la propriété existante
        ownerProperties = ownerProperties.filter(p => p.id !== editId);
    }
    
    ownerProperties.push(newProperty);
    localStorage.setItem('ownerProperties', JSON.stringify(ownerProperties));
    
    // Réinitialiser le formulaire
    propertyForm.reset();
    propertyForm.style.display = 'none';
    propertyForm.removeAttribute('data-editing');
    propertyForm.removeAttribute('data-edit-id');
    
    loadOwnerProperties();
    displayProperties(); // Rafraîchir l'affichage principal
    
    alert(isEdit ? "Propriété mise à jour avec succès!" : "Nouvelle propriété ajoutée avec succès!");
}

function loadOwnerProperties() {
    const ownerProperties = JSON.parse(localStorage.getItem('ownerProperties')) || [];
    const listContainer = document.getElementById('owner-properties-list');
    
    if (!listContainer) return;
    
    if (ownerProperties.length === 0) {
        listContainer.innerHTML = '<p>Aucune propriété ajoutée</p>';
        return;
    }
    
    listContainer.innerHTML = '';
    
    ownerProperties.forEach(prop => {
        const propElement = document.createElement('div');
        propElement.className = 'owner-property-item';
        propElement.innerHTML = `
            <div class="owner-prop-info">
                <h5>${prop.title}</h5>
                <p>${prop.price}</p>
            </div>
            <div class="owner-prop-actions">
                <button class="edit-prop" data-id="${prop.id}">✏️</button>
                <button class="delete-prop" data-id="${prop.id}">🗑️</button>
            </div>
        `;
        listContainer.appendChild(propElement);
        
        // Gestion des actions
        propElement.querySelector('.delete-prop').addEventListener('click', () => {
            deleteProperty(prop.id);
        });
        
        propElement.querySelector('.edit-prop').addEventListener('click', () => {
            editProperty(prop.id);
        });
    });
}

function deleteProperty(id) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette propriété ?")) return;
    
    let ownerProperties = JSON.parse(localStorage.getItem('ownerProperties')) || [];
    ownerProperties = ownerProperties.filter(p => p.id !== id);
    localStorage.setItem('ownerProperties', JSON.stringify(ownerProperties));
    
    loadOwnerProperties();
    displayProperties();
    
    alert("Propriété supprimée avec succès!");
}

function editProperty(id) {
    const ownerProperties = JSON.parse(localStorage.getItem('ownerProperties')) || [];
    const prop = ownerProperties.find(p => p.id === id);
    if (!prop) return;
    
    const propertyForm = document.getElementById('property-form');
    
    // Marquer le formulaire comme en mode édition
    propertyForm.dataset.editing = 'true';
    propertyForm.dataset.editId = id;
    
    // Remplir le formulaire
    document.getElementById('property-title').value = prop.title;
    document.getElementById('property-desc').value = prop.description;
    document.getElementById('property-price').value = prop.price;
    document.getElementById('property-img').value = prop.image;
    document.getElementById('property-video').value = prop.video || '';
    
    propertyForm.style.display = 'block';
}

/***********************
 * INTÉGRATION *
 ***********************/
function toggleOwnerButton(show) {
    let btn = document.getElementById('owner-access-btn');
    
    if (show) {
        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'owner-access-btn';
            btn.textContent = 'Espace Propriétaire';
            btn.addEventListener('click', authenticateOwner);
            
            const header = document.querySelector('header');
            if (header) {
                header.appendChild(btn);
            } else {
                // Si pas de header, ajouter au début du body
                const btnContainer = document.createElement('div');
                btnContainer.className = 'owner-btn-container';
                btnContainer.appendChild(btn);
                document.body.insertBefore(btnContainer, document.body.firstChild);
            }
        }
    } else if (!show && btn) {
        btn.remove();
    }
}

function setupPanelStyles() {
    // Vérifier si les styles existent déjà
    if (document.getElementById('owner-panel-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'owner-panel-styles';
    style.textContent = `
        #owner-panel {
            position: fixed;
            top: 0;
            right: 0;
            width: 350px;
            height: 100vh;
            background: white;
            box-shadow: -2px 0 10px rgba(0,0,0,0.2);
            z-index: 1000;
            padding: 20px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            overflow-y: auto;
        }
        #owner-panel.active {
            transform: translateX(0);
        }
        .owner-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
        }
        #owner-close-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
        }
        #owner-access-btn {
            background: #2c3e50;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            margin-left: 20px;
        }
        .owner-property-item, .visit-item {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #eee;
            margin-bottom: 10px;
        }
        #property-form input, #property-form textarea {
            width: 100%;
            margin-bottom: 10px;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        #property-form textarea {
            height: 100px;
            resize: vertical;
        }
        .form-actions {
            display: flex;
            justify-content: space-between;
        }
        .form-actions button {
            padding: 8px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .form-actions button[type="submit"] {
            background: #27ae60;
            color: white;
        }
        .form-actions button[type="button"] {
            background: #e74c3c;
            color: white;
        }
        #add-property-btn {
            background: #3498db;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 4px;
            cursor: pointer;
            margin-bottom: 20px;
            width: 100%;
        }
        .visits-section, .properties-section {
            margin-top: 20px;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }
        .edit-prop, .delete-prop, .delete-visit {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
        }
        .owner-btn-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 900;
        }
        @media (max-width: 768px) {
            #owner-panel {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(style);
}

/***********************
 * INITIALISATION *
 ***********************/
function initOwnerSystem() {
    // Afficher le bouton d'accès si pas authentifié
    toggleOwnerButton(!checkAuth());
    
    // Initialiser le panneau si authentifié
    if (checkAuth()) {
        initOwnerPanel();
        
        // Auto-logout après 1h (3600000 ms)
        setTimeout(ownerLogout, 3600000);
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Afficher les propriétés
    displayProperties();

    // Effet au scroll du header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
    
    // Initialiser le système propriétaire
    initOwnerSystem();
});