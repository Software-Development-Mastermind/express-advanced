DO
$do$
BEGIN
    IF EXISTS (SELECT FROM pg_database WHERE datname = 'full_stack_todos') THEN
      RAISE NOTICE 'Database already exists'; 
    ELSE
        PERFORM dblink_exec('dbname=' || current_database()  -- current db
                            , 'CREATE DATABASE full_stack_todos');
    END IF;
END
$do$;