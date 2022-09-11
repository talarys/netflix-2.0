import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { Movie } from '../typings';

export default function useList(uid: string | undefined) {
  const [list, setList] = useState<Movie[] | DocumentData>([]);

  useEffect(() => {
    if (!uid) return null;
    useEffect(() => onSnapshot(
      collection(db, 'customers', uid, 'myList'),
      (snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
      },
    ));

    return list;
  }, [db, uid]);
}
