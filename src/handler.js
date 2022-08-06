
const { nanoid }            = require('nanoid');
const notes                 = require('./notes');

const addNoteHandler        = (request, h) => { 
    const { title, tags, body } = request.payload;

    const id = nanoid(11);
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt;

    const storeNote = {
        id,
        title,
        tags,
        body,
        createdAt,
        updatedAt,
    };

    notes.push(storeNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Note has been created successfully',
            data: {
                noteId: id,
            },
            // error: false,
        });
        
        response.header('Access-Control-Allow-Origin', '*');
        
        response.code(201);

        return response;
    }
    
    const response = h.response({
         status: 'fail',
         message: 'Nice Try, buddy! But it\'s failed',
     });

     response.code(500);
     return response;
};

const getAllNotesHandler    = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler    = (request, h) => {
  const { id } = request.params;

  const note   = notes.filter((eachNote) => eachNote.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Note not found | 404',
    });

    response.code(404);
    return response;
};

const editNoteByIdHandler   = (request, h) => {
    const { id } = request.params;
    
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Note has been updated successfully',
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Fail to Updating Note. Id is not found | 404',
    });

    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Note has been deleted successfully',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Fail to delete Note. Id is not found | 404',
    });
    response.code(404);
    return response
};

module.exports = { 
    addNoteHandler, 
    getAllNotesHandler, 
    getNoteByIdHandler,
    editNoteByIdHandler, 
    deleteNoteByIdHandler,
};