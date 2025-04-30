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
        ville: "Grand-Bassam",
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
        ville: "Abidjan",
        video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
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
        ville: "Bingerville",
        video: "https://youtu.be/dQw4w9WgXcQ" 
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
        ville: "Grand-Bassam",
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
        ville: "Cocody",
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
        ville: "Abidjan",
        video: "https://m.youtube.com/embed?v=xlh-n2ii1M8&pp=ygURbWFpc29uIGluYXJjaGV2ZXI%3D" // Format embed mobile
    }
];

// Liste de villes pour le filtre
const villes = ["Toutes les villes", "Abidjan", "Grand-Bassam", "Bingerville", "Cocody", "Yopougon","yamoussokro"];

// Fonction pour générer un filtre de villes
function createCityFilter() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    
    const label = document.createElement('label');
    label.textContent = 'Filtrer par ville: ';
    label.htmlFo = 'city-filter';
    
    const select = document.createElement('select');
    select.id = 'city-filter';
    
    // Ajouter les options de villes
    villes.forEach(ville => {
        const option = document.createElement('option');
        option.value = ville;
        option.textContent = ville;
        select.appendChild(option);
    });
    
    select.addEventListener('change', function() {
        displayProperties(this.value);
    });
    
    filterContainer.appendChild(label);
    filterContainer.appendChild(select);
    
    // Insérer avant le conteneur de propriétés
    const propertyContainer = document.getElementById('propertyContainer');
    if (propertyContainer && propertyContainer.parentNode) {
        propertyContainer.parentNode.insertBefore(filterContainer, propertyContainer);
    }
}

// Fonction d'affichage des propriétés avec filtre
function displayProperties(cityFilter = "Toutes les villes") {
    const propertyContainer = document.getElementById('propertyContainer');
    if (!propertyContainer) return;
    
    // Vider le conteneur avant d'ajouter les propriétés
    propertyContainer.innerHTML = '';
    
    // Fusionner les propriétés par défaut avec celles du propriétaire
    const ownerProperties = JSON.parse(localStorage.getItem('ownerProperties')) || [];
    const allProperties = [...properties, ...ownerProperties];
    
    // Filtrer les propriétés par ville si nécessaire
    const filteredProperties = cityFilter === "Toutes les villes" 
        ? allProperties 
        : allProperties.filter(property => property.ville === cityFilter);
    
    // Afficher un message si aucune propriété ne correspond au filtre
    if (filteredProperties.length === 0) {
        propertyContainer.innerHTML = '<div class="no-properties">Aucune propriété disponible dans cette ville.</div>';
        return;
    }
    
    filteredProperties.forEach(property => {
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
                    <span><i class="fas fa-map-marker-alt"></i> ${property.ville || "Non spécifiée"}</span>
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
const OWNER_CODES = ["salimata", "OWNER456", "diarra"]; // Codes d'accès

// Vérifie l'authentification
function checkAuth() {
    return localStorage.getItem('ownerAuthenticated') === 'true';
}

// verification of the propertie 
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
 * GESTION DES MÉDIAS (IMAGES ET VIDÉOS) *
 ***********************/

// Fonction pour convertir les fichiers en base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Fonction pour vérifier si le fichier est une image valide
function isValidImage(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff'];
    return validTypes.includes(file.type);
}

// Fonction pour vérifier si le fichier est une vidéo valide
function isValidVideo(file) {
    const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo'];
    return validTypes.includes(file.type);
}

// Fonction pour prévisualiser l'image téléchargée
function previewImage(input, previewElement) {
    const file = input.files[0];
    if (!file) return;
    
    if (!isValidImage(file)) {
        alert("Format d'image non pris en charge. Formats acceptés: JPEG, PNG, GIF, WebP, BMP, TIFF");
        input.value = '';
        return;
    }
    
    fileToBase64(file).then(base64 => {
        previewElement.src = base64;
        previewElement.style.display = 'block';
    }).catch(error => {
        console.error("Erreur lors de la conversion de l'image:", error);
        alert("Erreur lors du traitement de l'image");
    });
}

// Fonction pour prévisualiser la vidéo téléchargée
function previewVideo(input, previewElement) {
    const file = input.files[0];
    if (!file) return;
    
    if (!isValidVideo(file)) {
        alert("Format vidéo non pris en charge. Formats acceptés: MP4, WebM, OGG, MOV, AVI");
        input.value = '';
        return;
    }
    
    fileToBase64(file).then(base64 => {
        previewElement.src = base64;
        previewElement.style.display = 'block';
    }).catch(error => {
        console.error("Erreur lors de la conversion de la vidéo:", error);
        alert("Erreur lors du traitement de la vidéo");
    });
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
                <input type="text" id="property-bedrooms" placeholder="Nombre de chambres">
                <input type="text" id="property-bathrooms" placeholder="Nombre de salles de bain">
                <input type="text" id="property-area" placeholder="Surface (m²)">
                
                <div class="form-group">
                    <label for="property-ville">Ville:</label>
                    <select id="property-ville" required>
                        <option value="">Sélectionnez une ville</option>
                        ${villes.slice(1).map(ville => `<option value="${ville}">${ville}</option>`).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Image:</label>
                    <div class="media-upload">
                        <input type="file" id="property-image-file" accept="image/*">
                        <p>OU</p>
                        <input type="text" id="property-img" placeholder="URL Image">
                    </div>
                    <img id="image-preview" style="display:none; max-width:100%; margin-top:10px;">
                </div>
                
                <div class="form-group">
                    <label>Vidéo:</label>
                    <div class="media-upload">
                        <input type="file" id="property-video-file" accept="video/*">
                        <p>OU</p>
                        <input type="text" id="property-video" placeholder="URL Vidéo YouTube">
                    </div>
                    <video id="video-preview" controls style="display:none; max-width:100%; margin-top:10px;"></video>
                </div>
                
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
        // Réinitialiser les prévisualisations
        document.getElementById('image-preview').style.display = 'none';
        document.getElementById('video-preview').style.display = 'none';
    });
    document.getElementById('property-form').addEventListener('submit', handlePropertySubmit);
    
    // Gestion des téléchargements d'images et vidéos
    document.getElementById('property-image-file').addEventListener('change', function() {
        previewImage(this, document.getElementById('image-preview'));
    });
    
    document.getElementById('property-video-file').addEventListener('change', function() {
        previewVideo(this, document.getElementById('video-preview'));
    });
    
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
async function handlePropertySubmit(e) {
    e.preventDefault();
    
    const propertyForm = document.getElementById('property-form');
    const isEdit = propertyForm.dataset.editing === 'true';
    const editId = isEdit ? parseInt(propertyForm.dataset.editId) : null;
    
    // Récupérer les valeurs du formulaire
    const title = document.getElementById('property-title').value;
    const description = document.getElementById('property-desc').value;
    const price = document.getElementById('property-price').value;
    const bedrooms = document.getElementById('property-bedrooms').value || "inconnu";
    const bathrooms = document.getElementById('property-bathrooms').value || "inconnu";
    const area = document.getElementById('property-area').value || "inconnu";
    const ville = document.getElementById('property-ville').value;
    
    // Gérer l'image (fichier ou URL)
    let imageUrl = document.getElementById('property-img').value;
    const imageFile = document.getElementById('property-image-file').files[0];
    
    // Gérer la vidéo (fichier ou URL YouTube)
    let videoUrl = document.getElementById('property-video').value;
    const videoFile = document.getElementById('property-video-file').files[0];
    
    // Convertir les fichiers en base64 si nécessaire
    if (imageFile) {
        try {
            imageUrl = await fileToBase64(imageFile);
        } catch (error) {
            console.error("Erreur lors de la conversion de l'image:", error);
            alert("Erreur lors du traitement de l'image");
            return;
        }
    }
    
    if (videoFile) {
        try {
            videoUrl = await fileToBase64(videoFile);
        } catch (error) {
            console.error("Erreur lors de la conversion de la vidéo:", error);
            alert("Erreur lors du traitement de la vidéo");
            return;
        }
    }
    
    // Vérifier les données obligatoires
    if (!title || !description || !price || !ville) {
        alert("Veuillez remplir tous les champs obligatoires (titre, description, prix et ville)");
        return;
    }
    
    if (!imageUrl && !imageFile) {
        alert("Veuillez fournir une image pour la propriété");
        return;
    }
    
    const newProperty = {
        id: isEdit ? editId : Date.now(),
        title,
        description,
        price,
        image: imageUrl,
        video: videoUrl,
        bedrooms,
        bathrooms,
        area,
        ville
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
    document.getElementById('image-preview').style.display = 'none';
    document.getElementById('video-preview').style.display = 'none';
    
    loadOwnerProperties();
    displayProperties(); // Rafraîchir l'affichage principal
    
    alert(isEdit ? "Propriété mise à jour avec succès! '  ⚠️ si la video ne s'affiche pas ou que c'est l'image alors reduissez la taille ou le format ou encore envoyer la video sur votre compte youtube et copier le lien dans la partie urrl ⚠️ " : "Nouvelle propriété ajoutée avec succès! ");
    alert(isEdit ? "si la video n'est pas visible, veuillez la télécharger à nouveau" : "si l'image aussi n'est pas visible, veuillez la télécharger à nouveau ou changer le format et ou la taille ");
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
                <p>${prop.price} - ${prop.ville}</p>
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
    document.getElementById('property-img').value = prop.image.startsWith('data:') ? '' : prop.image;
    document.getElementById('property-video').value = prop.video && !prop.video.startsWith('data:') ? prop.video : '';
    document.getElementById('property-bedrooms').value = prop.bedrooms !== "inconnu" ? prop.bedrooms : '';
    document.getElementById('property-bathrooms').value = prop.bathrooms !== "inconnu" ? prop.bathrooms : '';
    document.getElementById('property-area').value = prop.area !== "inconnu" ? prop.area : '';
    document.getElementById('property-ville').value = prop.ville || '';
    
    // Prévisualiser les images et vidéos
    const imagePreview = document.getElementById('image-preview');
    const videoPreview = document.getElementById('video-preview');
    
    if (prop.image) {
        imagePreview.src = prop.image;
        imagePreview.style.display = 'block';
    }
    
    if (prop.video && prop.video.startsWith('data:')) {
        videoPreview.src = prop.video;
        videoPreview.style.display = 'block';
    }
    
    propertyForm.style.display = 'block';
}


  //INTÉGRATION 
 
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
            width: 400px;
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
        #property-form input, #property-form textarea, #property-form select {
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
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .media-upload {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
            flex-wrap: wrap;
        }
        .media-upload input[type="file"] {
            flex: 1;
            min-width: 200px;
        }
        .media-upload input[type="text"] {
            flex: 1;
            min-width: 200px;
        }
        .media-upload p {
            margin: 0 10px;
            color: #777;
        }
        .filter-container {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f5f5f5;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .filter-container select {
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #ddd;
            background-color: white;
        }
        .no-properties {
            padding: 20px;
            text-align: center;
            font-style: italic;
            color: #777;
        }
        @media (max-width: 768px) {
            #owner-panel {
                width: 100%;
            }
            .media-upload {
                flex-direction: column;
                align-items: stretch;
            }
            .media-upload input[type="file"],
            .media-upload input[type="text"] {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(style);
}

// Fonction pour télécharger les médias
function downloadMedia(mediaUrl, filename) {
    // Créer un lien temporaire
    const a = document.createElement('a');
    a.href = mediaUrl;
    a.download = filename || 'media';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Fonction pour ajouter les boutons de téléchargement aux médias
function addDownloadButtonsToMedia() {
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        // Vérifier si les boutons n'existent pas déjà
        if (card.querySelector('.media-download-btn')) return;
        
        // Ajouter le bouton de téléchargement d'image
        const imageContainer = card.querySelector('.property-image-container');
        const image = card.querySelector('.property-image');
        
        if (imageContainer && image && image.src && !image.src.includes('placeholder')) {
            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'media-download-btn image-download-btn';
            downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
            downloadBtn.title = 'Télécharger l\'image';
            downloadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const filename = 'property-image-' + Date.now() + '.jpg';
                downloadMedia(image.src, filename);
            });
            imageContainer.appendChild(downloadBtn);
        }
        
        // Ajouter le bouton de téléchargement vidéo pour les vidéos base64
        const videoContainer = card.querySelector('.property-video-container');
        const video = card.querySelector('iframe');
        
        if (videoContainer && video && video.src && video.src.startsWith('data:')) {
            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'media-download-btn video-download-btn';
            downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
            downloadBtn.title = 'Télécharger la vidéo';
            downloadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const filename = 'property-video-' + Date.now() + '.mp4';
                downloadMedia(video.src, filename);
            });
            videoContainer.appendChild(downloadBtn);
        }
    });
    
    // Ajouter des styles CSS pour les boutons de téléchargement
    if (!document.getElementById('download-btn-styles')) {
        const style = document.createElement('style');
        style.id = 'download-btn-styles';
        style.textContent = `
            .media-download-btn {
                position: absolute;
                background: rgba(0, 0, 0, 0.6);
                color: white;
                border: none;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 10;
                transition: all 0.3s ease;
            }
            .image-download-btn {
                bottom: 10px;
                right: 10px;
            }
            .video-download-btn {
                top: 10px;
                right: 10px;
            }
            .media-download-btn:hover {
                background: rgba(0, 0, 0, 0.8);
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(style);
    }
}

/***********************
 * EXPORTATION DES DONNÉES *
 ***********************/

// Fonction pour exporter les données des propriétés et des visites
function exportOwnerData() {
    const ownerProperties = JSON.parse(localStorage.getItem('ownerProperties')) || [];
    const visites = JSON.parse(localStorage.getItem('visites')) || [];
    
    const data = {
        properties: ownerProperties,
        visits: visites,
        exportDate: new Date().toLocaleString()
    };
    
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'donnees-immobilieres-' + Date.now() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Ajouter un bouton d'exportation au panneau propriétaire
function addExportButton() {
    const ownerPanel = document.getElementById('owner-panel');
    if (!ownerPanel) return;
    
    // Vérifier si le bouton existe déjà
    if (document.getElementById('export-data-btn')) return;
    
    const btn = document.createElement('button');
    btn.id = 'export-data-btn';
    btn.innerHTML = '📊 Exporter les données';
    btn.className = 'export-data-btn';
    btn.addEventListener('click', exportOwnerData);
    
    // Ajouter le bouton après le bouton d'ajout de propriété
    const addPropertyBtn = document.getElementById('add-property-btn');
    if (addPropertyBtn && addPropertyBtn.parentNode) {
        addPropertyBtn.parentNode.insertBefore(btn, addPropertyBtn.nextSibling);
    }
    
    // Ajouter des styles pour le bouton
    const style = document.createElement('style');
    style.textContent = `
        .export-data-btn {
            background: #9b59b6;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 4px;
            cursor: pointer;
            margin-bottom: 20px;
            width: 100%;
        }
        .export-data-btn:hover {
            background: #8e44ad;
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
        addExportButton();
        
        // Auto-logout après 1h (3600000 ms)
        setTimeout(ownerLogout, 3600000);
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Créer le filtre par ville
    createCityFilter();
    
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
    
    // Observer les changements dans le DOM pour ajouter les boutons de téléchargement
    const observer = new MutationObserver(() => {
        addDownloadButtonsToMedia();
    });
    
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
    
    // Ajouter les boutons de téléchargement aux médias existants
    addDownloadButtonsToMedia();
});