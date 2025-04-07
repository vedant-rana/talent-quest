$('.js-toggleNavMobile').on('click', function (e) {
    e.preventDefault();
    $(this).closest('.header').find('.header__nav').toggleClass('header__nav--open');
});

function resolveRelativePath(relativePath) {
    if (relativePath.startsWith("~")) {
        var basePath = '';

        var pathArray = window.location.pathname.split('/');

        if (pathArray[1].toLowerCase() === "talentquest") {
            basePath += "/talentquest";
        }

        return basePath + relativePath.substring(1);
    }
    return relativePath; 
}

async function fetchData(id) {
    try {
        //var url; 

        //var pathArray = window.location.pathname.split('/');

        //if (pathArray[1].toLowerCase() === "talentquest") {
        //    url = `/talentquest/Logo/GetLogoUrlById/${id}`;
        //} else {
        //    url= `/Logo/GetLogoUrlById/${id}`;
        //}

        const response = await fetch(`/Logo/GetLogoUrlById/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}


async function updateImageSource(selectElement, imgId) {
    const selectedValue = selectElement.value;
    const imageElement = document.getElementById(imgId);

    if (imageElement) {
        const logoUrl = await fetchData(selectedValue);  

        if (logoUrl) {
            const resolvedImageUrl = resolveRelativePath(logoUrl);
            imageElement.src = resolvedImageUrl;  
        } else {
            imageElement.src = '';  
        }
    } else {
        console.error(`Element with id '${imgId}' not found.`);
    }
}

