const annotationListEl = document.getElementById('annotation-list');

async function fetchAnnotations() {
  const Annotation = Parse.Object.extend("Annotation");
  const query = new Parse.Query(Annotation);
  query.equalTo("user", Parse.User.current());
  query.descending("createdAt");

  try {
    const results = await query.find();
    renderAnnotations(results);
  } catch (error) {
    console.error("Error while fetching annotations", error);
  }
}

function renderAnnotations(annotations) {
  annotationListEl.innerHTML = '';
  annotations.forEach(annotation => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    listItem.textContent = annotation.get('text');
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Excluir';
    deleteButton.onclick = () => handleDeleteAnnotation(annotation.id);
    
    listItem.appendChild(deleteButton);
    annotationListEl.appendChild(listItem);
  });
}

const handleCreateAnnotation = async (event) => {
  event.preventDefault();
  const annotationTextEl = document.getElementById('annotation-text');
  const text = annotationTextEl.value;

  const Annotation = Parse.Object.extend("Annotation");
  const annotation = new Annotation();
  annotation.set("text", text);
  annotation.set("user", Parse.User.current());

  try {
    await annotation.save();
    annotationTextEl.value = '';
    fetchAnnotations();
  } catch (error) {
    console.error("Error while creating annotation", error);
  }
};

async function handleDeleteAnnotation(annotationId) {
  const Annotation = Parse.Object.extend("Annotation");
  const query = new Parse.Query(Annotation);

  try {
    const annotation = await query.get(annotationId);
    await annotation.destroy();
    fetchAnnotations();
  } catch (error) {
    console.error("Error while deleting annotation", error);
  }
}