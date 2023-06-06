import React, { FC, useState, FormEvent, ChangeEvent, useEffect, FocusEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { addressesActions } from 'store/slice/addresses';
import addressesService from 'services/addresses';
import searchIcon from 'assets/images/icons/searchWhite.svg';
import styles from './AddressesPage.module.scss';

const AddressesPage: FC = () => {
  const dispatchApp = useAppDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.addresses);
  const [query, setQuery] = useState('');
  const [queryDirty, setQueryDirty] = useState(false);
  const [queryError, setQueryError] = useState('Поле не может быть пустым');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (queryError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [queryError]);

  const blurHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case 'query':
        setQueryDirty(true);
        break;
    }
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3) {
      setQueryError('Минимальная длина - 3 символа');
    } else {
      setQueryError('');
    }
    setQuery(e.target.value);
  };
  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    query && dispatchApp(addressesService.getAddressesData({ query }));
  };

  useEffect(() => {
    return () => {
      dispatchApp(addressesActions.setError(null));
      dispatchApp(addressesActions.resetData());
    };
  }, []);

  return (
    <div className={styles.addressesPage}>
      <div className={styles.container}>
        <h2 className={styles.title}>Поиск адресов</h2>
        <p className={styles.subTitle}>Введите интересующий вас адрес</p>
        <form className={styles.search} onSubmit={(e) => searchHandler(e)}>
          <input
            className={styles.input}
            name="query"
            placeholder="Введите интересующий вас адрес"
            title="Введите интересующий вас адрес"
            onBlur={(e) => blurHandler(e)}
            onChange={inputHandler}
            value={query}
          />
          <button className={styles.button} type="submit" disabled={!isValid}>
            <img className={styles.button__icon} src={searchIcon} alt="search" />
            <span className={styles.button__text}>Поиск</span>
          </button>
        </form>
        {(queryDirty && queryError) && <p className={styles.inputError}>{queryError}</p>}
        {loading && <p className={styles.loading}>Загрузка...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {data.suggestions?.length === 0 && <p className={styles.loading}>Список пуст</p>}
        {data.suggestions?.length ? (
          <div className={styles.addresses}>
            <h3 className={styles.title}>Адреса</h3>
            <ul className={styles.list}>
              {data.suggestions.map((item, index) => {
                // eslint-disable-next-line react/no-array-index-key
                return <li key={index} className={styles.item}>{item.value}</li>;
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AddressesPage;
