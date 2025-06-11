// fakeTagService.js

let tags = [
  {
    tag_id: 1,
    name: "Micrófonos",
    father_id: null,
    description: "Categoría general de micrófonos",
    status: "ENABLED"
  },
  {
    tag_id: 2,
    name: "Micrófono de condensador",
    father_id: 1,
    description: "Subcategoría: micrófonos de condensador",
    status: "ENABLED"
  },
  {
    tag_id: 3,
    name: "Micrófono dinámico",
    father_id: 1,
    description: "Subcategoría: micrófonos dinámicos",
    status: "ENABLED"
  },
  {
    tag_id: 4,
    name: "Interfaces de audio",
    father_id: null,
    description: "Equipos de interfaz entre instrumentos/micros y la computadora",
    status: "ENABLED"
  },
  {
    tag_id: 5,
    name: "Focusrite Scarlett 2i2",
    father_id: 4,
    description: "Modelo popular de interfaz de audio",
    status: "ENABLED"
  }
];

// 🔁 Auto-incremento simulado
let nextId = 6;

// Simula delay de una API real
const simulateDelay = (result, delay = 300) =>
  new Promise((resolve) => setTimeout(() => resolve(result), delay));

// ✅ GET ALL
export const getAllTagsFake = async () => {
  return simulateDelay({ tags });
};

// ✅ GET BY ID
export const getTagByIdFake = async (id) => {
  const tag = tags.find((t) => t.tag_id === Number(id));
  if (!tag) throw new Error("Tag no encontrado");
  return simulateDelay(tag);
};

// ✅ DELETE
export const deleteTagByIdFake = async (tagId) => {
  const index = tags.findIndex((t) => t.tag_id === Number(tagId));
  if (index === -1) throw new Error("Tag no encontrado para eliminar");
  tags.splice(index, 1);
  return simulateDelay({ success: true });
};

// ✅ CREATE
/*export const createTagFake = async (tagData) => {
  const newTag = {
    tag_id: nextId++,
    name: tagData.name || "",
    father_id: tagData.father_id || null,
    description: tagData.description || "",
    status: tagData.status || "ENABLED"
  };

  console.log(Object.isExtensible(tags));
  tags.push(newTag);
  return simulateDelay(newTag);
};*/

export const createTagFake = async (tagData) => {
  // Si tags no es extensible, crear una copia nueva y asignarla
  if (!Object.isExtensible(tags)) {
    tags = [...tags];
  }

  const newTag = {
    tag_id: nextId++,
    name: tagData.name || "",
    father_id: tagData.father_id || null,
    description: tagData.description || "",
    status: tagData.status || "ENABLED",
  };

  console.log("¿tags es extensible? ", Object.isExtensible(tags));
  tags.push(newTag);

  return simulateDelay(newTag);
};



// ✅ UPDATE
export const updateTagFake = async (tagId, tagData) => {
  const index = tags.findIndex((t) => t.tag_id === Number(tagId));
  if (index === -1) throw new Error("Tag no encontrado para actualizar");
  tags[index] = { ...tags[index], ...tagData };
  return simulateDelay(tags[index]);
};
