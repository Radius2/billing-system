import { Box, Button, Dialog } from '@material-ui/core';
import React, { useState} from 'react';
import useOneElement from '../../../hooks/useOneElement';
import useStyle from './oneElementStyle';
import PreventActionDialog from '../../Shared/PreventActionDialog';
import { ACCESSORS, str } from '../../../util/structure/formStructures/actStructure';
import TitleOneElement from './Components/TitleOneElement';
import DeleteDialog from '../../Shared/DeleteDialog';

export default function OneElementContractForm({ structure, id, open, submitHandler, cancelHandler, preparedValue = {} }) {
  const { formName } = structure;
  const classes = useStyle();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { data, loading, deleteElement, editing, isValidElement, input, closeHandler, addMode, openDialog, setOpenDialog, actionButtonHandler } = useOneElement(
    {
      formName,
      id,
      str,
      preparedValue,
      submitHandler,
      cancelHandler,
    }
  );

  return (
    <Dialog
      open={open}
      maxWidth={false}
      fullScreen
      className={classes.root}
      onClose={closeHandler}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'>
      <Box style={{ height: '100vh' }}>
        <PreventActionDialog openDialog={openDialog} submitHandler={() => setOpenDialog(false)} cancelHandler={cancelHandler} />
        <DeleteDialog openDialog={openDeleteDialog} closeHandler={() => setOpenDeleteDialog(false)} deleteHandler={deleteElement} disableField />
        <Box className={classes.container} style={{ width: '400px', height: '100%', display: 'flex', flexFlow: 'column' }}>
          <TitleOneElement
            id={data.id}
            addMode={addMode}
            title={`Изменить`}
            addTitle={'Добавить'}
            closeHandler={closeHandler}
            nameElement={''}
            deleteElementHandler={() => setOpenDeleteDialog(true)}
          />
          {!loading && (
            <>
              <Box style={{ display: 'flex', flexFlow: 'column', height: '100%' }}>
                <Box>
                  {input(ACCESSORS.ACT_DATE)}
                  {input(ACCESSORS.ACT_NUMBER)}
                  {input(ACCESSORS.OBJECT)}
                  {input(ACCESSORS.ACT_TYPE)}
                </Box>
                {editing && (
                  <Box className={classes.actionPanel} style={{ marginTop: 'auto' }}>
                    <Button disabled={!isValidElement} size='large' color='primary' onClick={actionButtonHandler}>
                      Сохранить
                    </Button>
                    <Button size='large' onClick={closeHandler}>
                      Выход
                    </Button>
                  </Box>
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Dialog>
  );
}
