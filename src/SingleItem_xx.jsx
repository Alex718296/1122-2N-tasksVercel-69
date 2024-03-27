import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from './db/clientSupabase';
import { toast } from 'react-toastify';

const SingleItem_69 = ({ item }) => {
  const queryClient = useQueryClient();
  const { mutate: editTask } = useMutation({
    mutationFn: async ({ taskId, isDone }) => {
      try {
        const { data, error } = await supabase
          .from('task_69')
          .update({ is_done: isDone })
          .eq('id', taskId)
          .select();
      } catch (error) {
        console.log(error);
      }
      },
      onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
      toast.success('task updated');
    },
  });

    const {mutate: deleteTask} =useMutation ({
      mutationFn:async(taskId)=>{
        try {
        const { error } = await supabase
        .from('task_69')
        .delete()
        .eq('id', taskId);
        
        }catch (error){
          console.log(error);
        }
      },
          onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['tasks'],
          });
          toast.success('task deleted');
      }
    })

  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.is_done}
        onChange={() => editTask({ taskId: item.id, isDone: !item.is_done })}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className='btn remove-btn'
        type='button'
        onClick={() => deleteTask(item.id )}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem_69;